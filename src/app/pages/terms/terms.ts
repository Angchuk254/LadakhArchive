import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-terms',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './terms.html',
  styleUrl: './terms.scss'
})
export class Terms {
  lastUpdated = 'June 30, 2025';

  sections = [
    {
      icon: 'bi-check-circle',
      title: 'acceptance of Terms',
      content: `By accessing and using the Ladakh archive website, you accept and agree to be bound by these Terms of Use. If you do not agree with any part of these terms, please do not use our website. Continued use of the site constitutes acceptance of any updates to these terms.`
    },
    {
      icon: 'bi-book',
      title: 'Use License',
      content: `Ladakh archive grants you a limited, non-exclusive, non-transferable licence to access and use the website for personal, educational, and non-commercial purposes. You may view, download, and print content for personal study or research, provided you retain all copyright and attribution notices.`
    },
    {
      icon: 'bi-c-circle',
      title: 'Content Ownership & attribution',
      content: `all original content on Ladakh archive, including text, photographs, illustrations, maps, and design elements, is owned by Ladakh archive or its contributors and is protected by intellectual property laws. When sharing or referencing our content, you must provide proper attribution to Ladakh archive and the original creator.`
    },
    {
      icon: 'bi-pencil-square',
      title: 'User Contributions',
      content: `By submitting content to Ladakh archive through our contribution forms, you grant us a non-exclusive, royalty-free, perpetual licence to use, display, modify, and distribute your content on our platform. You represent that you own or have the necessary rights to the content you submit and that it does not infringe on any third-party rights.`
    },
    {
      icon: 'bi-x-circle',
      title: 'Prohibited Uses',
      content: `You may not use this website for any unlawful purpose or in violation of these terms. Specifically, you may not reproduce content for commercial purposes without written permission, misrepresent the source or authorship of content, attempt to interfere with the website's operation, or use automated systems to scrape or collect data.`
    },
    {
      icon: 'bi-exclamation-triangle',
      title: 'Disclaimers',
      content: `Ladakh archive provides content on an "as-is" and "as-available" basis. While we strive for accuracy, we make no warranties regarding the completeness, reliability, or accuracy of any content. Historical information is presented based on available research and may be updated as new evidence emerges.`
    },
    {
      icon: 'bi-clipboard-x',
      title: 'Limitation of Liability',
      content: `Ladakh archive and its contributors shall not be liable for any indirect, incidental, or consequential damages arising from your use of the website. Our total liability for any claims related to the use of this site shall not exceed the amount you paid to access the site, if any.`
    },
    {
      icon: 'bi-link-45deg',
      title: 'External Links',
      content: `Our website may contain links to external sites that are not operated by us. We have no control over the content and practices of these sites and we cannot accept responsibility for their content or privacy policies. We encourage you to review the terms and policies of any third-party site you visit.`
    },
    {
      icon: 'bi-arrow-repeat',
      title: 'Changes to Terms',
      content: `We reserve the right to modify these Terms of Use at any time. Changes become effective immediately upon posting on this page. We will update the "Last Updated" date at the top of this page. Your continued use of the website after changes are posted constitutes acceptance of the revised terms.`
    },
    {
      icon: 'bi-geo-alt',
      title: 'Governing Law',
      content: `These Terms of Use shall be governed by and construed in accordance with the laws of India. any disputes arising from these terms or your use of Ladakh archive shall be subject to the exclusive jurisdiction of the courts in Leh, Ladakh, Union Territory of Ladakh, India.`
    }
  ];
}




