import { doc, setDoc } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../contexts/AuthContext';

const SaveChapterButton = ({ title, content }: { title: string; content: string }) => {
  const { user } = useAuth();

  const handleSave = async () => {
    if (!user) return alert('Please log in to save your work.');
    const ref = doc(db, 'users', user, 'chapters', title);
    await setDoc(ref, { content, updated: Date.now() });
    alert('Chapter saved.');
  };

  return <button onClick={handleSave} className="btn">💾 Save</button>;
};

export default SaveChapterButton;