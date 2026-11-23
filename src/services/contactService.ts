import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, handleFirestoreError, OperationType } from '../firebase';
import {
  submitContactMessage,
  type ContactFormValues,
  type ContactSubmissionResult,
} from '../utils/portfolioLogic';

export const CONTACT_COLLECTION_PATH = 'contact_messages';

export async function submitContactToFirestore(
  values: ContactFormValues
): Promise<ContactSubmissionResult> {
  return submitContactMessage(values, async (payload) => {
    try {
      const docRef = await addDoc(collection(db, CONTACT_COLLECTION_PATH), {
        name: payload.name,
        email: payload.email,
        message: payload.message,
        createdAt: serverTimestamp(),
        source: payload.source,
      });
      return docRef.id;
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, CONTACT_COLLECTION_PATH);
    }
  });
}
