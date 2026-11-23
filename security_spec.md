# Firestore Security Specification — Portfolio Contact Inbox

## 1. Data Invariants
1. **Write-Only Public Drop-Box**: Unauthenticated visitors may ONLY `create` documents inside `/contact_messages/{messageId}`. All public `get`, `list`, `update`, and `delete` operations are unconditionally denied (`allow read, update, delete: if false;`) to prevent PII exposure and tampering.
2. **Strict Schema Enforcement**: Every created document MUST contain strictly the 5 required keys (`name`, `email`, `message`, `createdAt`, `source`) and zero undeclared shadow fields.
3. **Bounded Volumetric Limits**:
   - `messageId`: `^[a-zA-Z0-9_\-]+$`, max 128 chars (ID poisoning guard).
   - `name`: string, 2–120 chars.
   - `email`: string, 5–254 chars, matching `^[^\s@]+@[^\s@]+\.[^\s@]{2,}$`.
   - `message`: string, 10–2000 chars.
   - `source`: string literal `'portfolio-web'`.
4. **Temporal Integrity**: `createdAt` MUST be a Firestore timestamp strictly equal to `request.time` (server timestamp). Client-forged timestamps are rejected.
5. **Default-Deny Catch-All**: Any path outside `/contact_messages/{messageId}` is unconditionally denied (`allow read, write: if false;`).

## 2. The "Dirty Dozen" Adversarial Payloads (All Must Be Denied)
1. **Shadow Field Injection**: Valid payload plus `{ "isAdmin": true }` -> Rejected by `hasOnly(...)`.
2. **Missing Required Field**: Missing `source` or `createdAt` -> Rejected by `hasAll(...)`.
3. **Invalid Source Literal**: `{ ..., "source": "curl-script" }` -> Rejected by `source == 'portfolio-web'`.
4. **Client-Forged Timestamp**: `{ ..., "createdAt": "2020-01-01T00:00:00Z" }` -> Rejected by `createdAt is timestamp && createdAt == request.time`.
5. **Oversized Message (Denial of Wallet)**: `message` of 2,001 characters -> Rejected by `message.size() <= 2000`.
6. **Empty / Too-Short Message**: `message` of 3 characters (`"hey"`) -> Rejected by `message.size() >= 10`.
7. **Oversized Name**: `name` of 121 characters -> Rejected by `name.size() <= 120`.
8. **Malformed Email**: `email: "not-an-email"` -> Rejected by regex match.
9. **Wrong Field Type (Value Poisoning)**: `name: 12345` or `message: ["array"]` -> Rejected by `is string`.
10. **Document ID Poisoning**: `messageId` containing spaces, slashes, or >128 chars -> Rejected by `isValidId(messageId)`.
11. **Public Read / PII Scraping**: `get` or `list` on `/contact_messages` -> Rejected by `allow read: if false;`.
12. **Public Tampering / Deletion**: `update` or `delete` on `/contact_messages/{id}` -> Rejected by `allow update, delete: if false;`.
