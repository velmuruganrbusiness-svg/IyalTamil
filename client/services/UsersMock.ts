
import type { User } from '../types';

// A database of real authors and generic users for the platform
export const authors = {
    // Poets
    bharathi: { id: 101, name: 'மகாகவி பாரதியார்', avatarUrl: 'https://ui-avatars.com/api/?name=MB&background=f43f5e&color=fff&bold=true' },
    bharathidasan: { id: 102, name: 'பாவேந்தர் பாரதிதாசன்', avatarUrl: 'https://ui-avatars.com/api/?name=PB&background=0ea5e9&color=fff&bold=true' },
    vairamuthu: { id: 103, name: 'கவிப்பேரரசு வைரமுத்து', avatarUrl: 'https://ui-avatars.com/api/?name=KV&background=8b5cf6&color=fff' },
    kannadasan: { id: 104, name: 'கவியரசு கண்ணதாசன்', avatarUrl: 'https://ui-avatars.com/api/?name=KK&background=10b981&color=fff' },
    naMuthukumar: { id: 105, name: 'நா. முத்துக்குமார்', avatarUrl: 'https://ui-avatars.com/api/?name=NM&background=f59e0b&color=fff' },
    meera: { id: 106, name: 'கவிஞர் மீரா', avatarUrl: 'https://ui-avatars.com/api/?name=KM&background=ec4899&color=fff' },

    // Leaders & Philosophers
    kalam: { id: 201, name: 'ஏ.பி.ஜெ. அப்துல் கலாம்', avatarUrl: 'https://ui-avatars.com/api/?name=AK&background=3b82f6&color=fff&bold=true' },
    vivekananda: { id: 202, name: 'சுவாமி விவேகானந்தர்', avatarUrl: 'https://ui-avatars.com/api/?name=SV&background=f97316&color=fff' },
    motherTeresa: { id: 203, name: 'அன்னை தெரசா', avatarUrl: 'https://ui-avatars.com/api/?name=MT&background=06b6d4&color=fff' },
    buddha: { id: 204, name: 'கௌதம புத்தர்', avatarUrl: 'https://ui-avatars.com/api/?name=GB&background=eab308&color=fff' },
    gandhi: { id: 205, name: 'மகாத்மா காந்தி', avatarUrl: 'https://ui-avatars.com/api/?name=MG&background=64748b&color=fff' },
    kamarajar: { id: 206, name: 'பெருந்தலைவர் காமராஜர்', avatarUrl: 'https://ui-avatars.com/api/?name=PK&background=ef4444&color=fff' },
    
    // Storytellers & Writers
    aesop: { id: 301, name: 'ஈசாப்', avatarUrl: 'https://ui-avatars.com/api/?name=Es&background=84cc16&color=fff' },
    kalki: { id: 302, name: 'கல்கி', avatarUrl: 'https://ui-avatars.com/api/?name=Kl&background=14b8a6&color=fff' },
    sujatha: { id: 303, name: 'சுஜாதா', avatarUrl: 'https://ui-avatars.com/api/?name=Sj&background=6366f1&color=fff' },
    kiRa: { id: 304, name: 'கி. ராஜநாராயணன்', avatarUrl: 'https://ui-avatars.com/api/?name=KR&background=d946ef&color=fff' },
    jeyakanthan: { id: 305, name: 'ஜெயகாந்தன்', avatarUrl: 'https://ui-avatars.com/api/?name=JK&background=a855f7&color=fff' },
    muVaradharasanar: { id: 306, name: 'மு. வரதராசனார்', avatarUrl: 'https://ui-avatars.com/api/?name=MV&background=059669&color=fff' },

    // Modern/Community Users (for general articles)
    senthil: { id: 401, name: 'செந்தில் குமார்', avatarUrl: 'https://picsum.photos/seed/senthil/100' },
    anitha: { id: 402, name: 'அனிதா', avatarUrl: 'https://picsum.photos/seed/anitha/100' },
    raghavan: { id: 403, name: 'ராகவன்', avatarUrl: 'https://picsum.photos/seed/raghavan/100' },
    meena: { id: 404, name: 'மீனாட்சி', avatarUrl: 'https://picsum.photos/seed/meena/100' },
    arun: { id: 405, name: 'அருண் மொழி', avatarUrl: 'https://picsum.photos/seed/arun/100' },
};

// Default export for backward compatibility if needed, though mostly we use named exports now
export const mockUsers: User[] = Object.values(authors);
