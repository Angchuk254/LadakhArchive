import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-privacy',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './privacy.html',
  styleUrl: './privacy.scss'
})
export class Privacy {
  lastUpdated = 'June 30, 2025';

  sections = [
    {
      icon: 'bi-info-circle',
      title: 'Information We Collect',
      content: `When you visit Ladakh archive, we may collect certain information automatically, including your IP address, browser type, operating system, referring URLs, and pages viewed. If you use our contact or contribution forms, we collect the information you provide, such as your name, email address, and message content.`
    },
    {
      icon: 'bi-graph-up',
      title: 'How We Use Your Information',
      content: `We use the information we collect to operate and improve the Ladakh archive website, respond to your inquiries and contributions, analyse usage patterns to enhance user experience, send occasional updates about new content (only if you opt in), and ensure the security and integrity of our platform.`
    },
    {
      icon: 'bi-cookie',
      title: 'Cookies & Tracking',
      content: `Ladakh archive uses essential cookies to ensure basic functionality of the website. We may also use analytics cookies to understand how visitors interact with our site. You can control cookie preferences through your browser settings. Disabling cookies may affect certain features of the website.`
    },
    {
      icon: 'bi-share',
      title: 'Third-Party Services',
      content: `We may use third-party services such as analytics providers and content delivery networks. These services may collect information about your visit as governed by their own privacy policies. We do not sell, trade, or rent your personal information to third parties.`
    },
    {
      icon: 'bi-shield-lock',
      title: 'Data Security',
      content: `We implement appropriate technical and organisational measures to protect your personal information against unauthorised access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.`
    },
    {
      icon: 'bi-people',
      title: 'Children\'s Privacy',
      content: `Ladakh archive is an educational resource suitable for all ages. We do not knowingly collect personal information from children under 13. If you believe a child has provided personal information through our site, please contact us and we will promptly remove it.`
    },
    {
      icon: 'bi-arrow-repeat',
      title: 'Changes to This Policy',
      content: `We may update this Privacy Policy from time to time to reflect changes in our practices or applicable laws. We will post the updated policy on this page with a revised "Last Updated" date. We encourage you to review this policy periodically.`
    },
    {
      icon: 'bi-envelope',
      title: 'Contact Us',
      content: `If you have any questions or concerns about this Privacy Policy or our data practices, please reach out through our Contribute page or email us at privacy@ladakharchive.org. We will respond to your inquiry within a reasonable timeframe.`
    }
  ];
}




