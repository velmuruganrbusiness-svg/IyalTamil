
import type { Post, ClassicalWork, Competition } from '../types';
import { thirukkuralData } from './ThirukkuralMock';
import { aathichoodiData } from './AathichoodiMock';
import { historyData } from './HistoryMock';

// Aggregate all posts
const mockPosts: Post[] = ([] as Post[]).sort((a, b) => {
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
});   


const mockClassics: ClassicalWork[] = [
    thirukkuralData,
    aathichoodiData
];

const mockCompetitions: Competition[] = [
    {
        id: 1,
        title: 'பாரதியார் கவிதைப் போட்டி 2024',
        description: 'தேசிய கவிஞர் பாரதியாரின் பிறந்தநாளை முன்னிட்டு நடத்தப்படும் மாபெரும் கவிதைப் போட்டி. "பெண் விடுதலை" என்ற தலைப்பில் உங்கள் கவிதைகளை அனுப்புங்கள்.',
        deadline: '2024-12-11',
        status: 'active',
        prize: '₹10,000 + சான்றிதழ்',
        imageUrl: 'https://picsum.photos/seed/bharathi-comp/600/400'
    },
    {
        id: 2,
        title: 'சிறுகதைப் போட்டி: கிராமத்து மண்',
        description: 'கிராமத்து வாழ்வியலை பிரதிபலிக்கும் சிறந்த சிறுகதைகளுக்கான போட்டி. உங்கள் கதைகள் 1500 வார்த்தைகளுக்கு மிகாமல் இருக்க வேண்டும்.',
        deadline: '2024-11-30',
        status: 'active',
        prize: '₹5,000 + புத்தகங்கள்',
        imageUrl: 'https://picsum.photos/seed/village-story/600/400'
    },
    {
        id: 3,
        title: 'சங்க இலக்கிய வினாடி வினா',
        description: 'சங்க இலக்கியங்கள் குறித்த உங்கள் அறிவை சோதிக்க ஒரு அரிய வாய்ப்பு. இணைய வழியில் நடைபெறும் இந்த வினாடி வினாவில் பங்கேற்று பரிசுகளை வெல்லுங்கள்.',
        deadline: '2024-10-15',
        status: 'completed',
        prize: 'தங்க நாணயம்',
        imageUrl: 'https://picsum.photos/seed/quiz-tamil/600/400'
    }
];

export const mockApi = {
  getPosts: (): Promise<Post[]> => {
    return new Promise(resolve => setTimeout(() => resolve([...mockPosts]), 500));
  },
  getPostById: (id: string): Promise<Post | undefined> => {
    return new Promise(resolve => setTimeout(() => resolve(mockPosts.find(p => p._id === id)), 300));
  },
  getClassicalWorks: (): Promise<ClassicalWork[]> => {
     return new Promise(resolve => setTimeout(() => resolve([...mockClassics]), 500));
  },
  getCompetitions: (): Promise<Competition[]> => {
      return new Promise(resolve => setTimeout(() => resolve([...mockCompetitions]), 500));
  }
};
