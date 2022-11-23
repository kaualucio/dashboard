import { getBlob } from 'firebase/storage';
import { ref, storage, uploadBytes, getDownloadURL } from '../service/firebase';

export async function addImageFile(file: File, path: string) {
  try {
  const storageRef = ref(storage, `${path}/${file.name}`);

  await uploadBytes(storageRef, file)
  const profilePictureURL = await getDownloadURL(storageRef)

  return {
    type: 'success',
    picture_url: profilePictureURL
  }
  } catch (error) {
    return {
      type: 'error',
      picture_url: ''
    }
  }
}