import { Component, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contribute',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './contribute.html',
  styleUrl: './contribute.scss',
})
export class Contribute {
  /* â”€â”€ Form State â”€â”€ */
  formData = signal<ContributeForm>({
    name: '',
    email: '',
    category: '',
    title: '',
    description: '',
    location: '',
    source: '',
    mediaUrl: '',
    consent: false,
  });

  submitted = signal(false);
  submitting = signal(false);

  /* â”€â”€ Categories â”€â”€ */
  categories = [
    { value: 'history', label: 'Historical Event / Fact', icon: 'bi-hourglass-split' },
    { value: 'culture', label: 'Culture & Tradition', icon: 'bi-palette' },
    { value: 'nature', label: 'Nature & Wildlife', icon: 'bi-tree' },
    { value: 'politics', label: 'Political History', icon: 'bi-bank' },
    { value: 'routes', label: 'Routes & Journeys', icon: 'bi-signpost-split' },
    { value: 'education', label: 'Education', icon: 'bi-mortarboard' },
    { value: 'photo', label: 'Photograph / Media', icon: 'bi-camera' },
    { value: 'story', label: 'Personal Story / Oral History', icon: 'bi-chat-quote' },
    { value: 'correction', label: 'Correction / Update', icon: 'bi-pencil-square' },
    { value: 'other', label: 'Other', icon: 'bi-three-dots' },
  ];

  /* â”€â”€ How It Works Steps â”€â”€ */
  steps = [
    { icon: 'bi-pencil-square', title: 'Submit', desc: 'Fill out the contribution form with your knowledge, story, photo, or correction.' },
    { icon: 'bi-shield-check', title: 'Review', desc: 'Our editorial team verifies accuracy, sources, and relevance with local experts.' },
    { icon: 'bi-check-circle', title: 'Publish', desc: 'approved contributions are credited to you and published on Ladakharchive.' },
  ];

  /* â”€â”€ Contribution Types â”€â”€ */
  contributionTypes = [
    { icon: 'bi-journal-text', title: 'Written articles', desc: 'Share historical accounts, cultural descriptions, travel experiences, or research findings about Ladakh. any length â€” from a paragraph to a full essay.', color: '#2563eb' },
    { icon: 'bi-camera', title: 'Photographs', desc: 'Original photos of Ladakh\'s landscapes, people, festivals, architecture, wildlife, or historical documents. High resolution preferred.', color: '#c8702a' },
    { icon: 'bi-film', title: 'Videos & audio', desc: 'Documentary clips, festival recordings, oral history interviews, folk songs, or ambient soundscapes from across the region.', color: '#7c3aed' },
    { icon: 'bi-map', title: 'Maps & Routes', desc: 'Hand-drawn or GPS-tracked routes, historical maps, village layouts, or trekking trail details with waypoints.', color: '#059669' },
    { icon: 'bi-chat-quote', title: 'Oral Histories', desc: 'Record and share stories from elders â€” migration tales, folk legends, war accounts, or memories of old Ladakh before modernization.', color: '#dc2626' },
    { icon: 'bi-translate', title: 'Translations', desc: 'Help translate content into Ladakhi, Balti, Purgi, Hindi, or Urdu. also accept translations of historical texts and inscriptions.', color: '#0d9488' },
  ];

  /* â”€â”€ Stats â”€â”€ */
  stats = [
    { icon: 'bi-people', value: '240+', label: 'Contributors' },
    { icon: 'bi-file-earmark-text', value: '1,400+', label: 'Submissions' },
    { icon: 'bi-check2-all', value: '850+', label: 'Published' },
    { icon: 'bi-globe', value: '18', label: 'Countries' },
  ];

  /* â”€â”€ Top Contributors â”€â”€ */
  topContributors = [
    { name: 'Tsewang Rigzin', location: 'Leh', contributions: 47, category: 'History & Culture', avatar: 'TR', color: '#2563eb' },
    { name: 'Fatima Bano', location: 'Kargil', contributions: 38, category: 'Oral Histories', avatar: 'FB', color: '#ec4899' },
    { name: 'Stanzin Dorjay', location: 'Zanskar', contributions: 35, category: 'Photography', avatar: 'SD', color: '#059669' },
    { name: 'Padma Chorol', location: 'Nubra', contributions: 31, category: 'Nature & Wildlife', avatar: 'PC', color: '#c8702a' },
    { name: 'Mohd. Iqbal', location: 'Drass', contributions: 28, category: 'Routes & Maps', avatar: 'MI', color: '#7c3aed' },
    { name: 'Sonam angmo', location: 'Changthang', contributions: 24, category: 'Education', avatar: 'Sa', color: '#0d9488' },
  ];

  /* â”€â”€ Guidelines â”€â”€ */
  guidelines = [
    { icon: 'bi-check-circle', text: 'all content must be original or clearly attributed to its source.' },
    { icon: 'bi-check-circle', text: 'Provide context: dates, locations, and names when possible.' },
    { icon: 'bi-check-circle', text: 'Photographs should be your own or used with permission.' },
    { icon: 'bi-check-circle', text: 'Respect cultural sensitivities and sacred traditions.' },
    { icon: 'bi-check-circle', text: 'Corrections require credible sources or references.' },
    { icon: 'bi-check-circle', text: 'Content is reviewed before publishing â€” allow 3â€“7 days.' },
  ];

  /* â”€â”€ Form Methods â”€â”€ */
  updateField(field: keyof ContributeForm, value: string | boolean) {
    this.formData.update(f => ({ ...f, [field]: value }));
  }

  onSubmit() {
    this.submitting.set(true);

    // Simulate submission (will be replaced with real backend call)
    setTimeout(() => {
      this.submitting.set(false);
      this.submitted.set(true);
    }, 1500);
  }

  resetForm() {
    this.formData.set({
      name: '',
      email: '',
      category: '',
      title: '',
      description: '',
      location: '',
      source: '',
      mediaUrl: '',
      consent: false,
    });
    this.submitted.set(false);
  }

  get isFormValid(): boolean {
    const f = this.formData();
    return !!(f.name && f.email && f.category && f.title && f.description && f.consent);
  }
}

interface ContributeForm {
  name: string;
  email: string;
  category: string;
  title: string;
  description: string;
  location: string;
  source: string;
  mediaUrl: string;
  consent: boolean;
}




