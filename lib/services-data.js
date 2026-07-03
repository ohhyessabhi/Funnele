// Single source of truth for the 4 disciplines — used by the services overview
// page, each dedicated service page, and the footer/nav links.

const services = [
  {
    slug: 'meta-ads',
    num: '01',
    icon: 'icon-meta',
    name: 'Meta Ads',
    tagline: 'Full-funnel paid social management.',
    positioning:
      'Full-funnel campaign management for ecommerce and DTC brands — delivered under your agency’s name.',
    summary:
      'From prospecting through retargeting, built for ecommerce and DTC accounts that need consistent testing velocity.',
    tags: ['Campaign builds', 'Creative testing'],
    deliverables: [
      { title: 'Campaign Builds', desc: 'Full account structure, audience segmentation, and creative rotation.' },
      { title: 'Creative Testing', desc: 'Structured A/B testing across ad formats, hooks and offers.' },
      { title: 'Retargeting', desc: 'Full-funnel sequences from view to purchase to repeat.' },
      { title: 'Weekly Reporting', desc: 'White-labeled performance reports, ready for your client calls.' }
    ],
    whyTitle: 'Why white-label Meta Ads with Funnele',
    whyPoints: [
      { title: 'Testing velocity your team can’t match solo', desc: 'A dedicated Meta specialist running structured creative tests every week, not squeezed in between other channels.' },
      { title: 'Reports carry your brand, not ours', desc: 'Dashboards, decks and invoices are white-labeled — your client never sees the Funnele name.' },
      { title: 'Built for ecommerce margins', desc: 'Prospecting and retargeting sequences designed around DTC and ecommerce unit economics, not generic lead-gen playbooks.' }
    ],
    metrics: [
      { label: 'Spend', value: 65 },
      { label: 'ROAS', value: 88 },
      { label: 'CTR', value: 72 },
      { label: 'CPA', value: 45 }
    ],
    faqs: [
      { q: 'Do you work directly with our client, or only with us?', a: 'Only with you. We operate inside your agency’s workflow — your client sees your name on every deliverable, and we never make direct contact with them.' },
      { q: 'What ad accounts and access do you need?', a: 'Scoped access to the Meta Ads account, the pixel/CAPI setup, and Business Manager. NDA and non-compete are signed before any access is granted.' },
      { q: 'How is Meta Ads priced?', a: 'Fixed monthly pricing per account, agreed before onboarding. No revenue share, no ad-spend-based markup, no surprise scope creep.' },
      { q: 'What does the weekly report look like?', a: 'A white-labeled performance summary — spend, ROAS, creative test results and next-step recommendations — formatted for you to forward or present as your own.' }
    ]
  },
  {
    slug: 'google-ads',
    num: '02',
    icon: 'icon-google',
    name: 'Google Ads',
    tagline: 'Search, Shopping and Performance Max.',
    positioning:
      'Search, Shopping and Performance Max, built around margin — delivered under your agency’s name.',
    summary:
      'Bidding built around margin, not just volume — especially critical for ecommerce accounts with tight product margins.',
    tags: ['Account structure', 'Bid strategy'],
    deliverables: [
      { title: 'Account Structure', desc: 'Campaign architecture built for scale and clean reporting.' },
      { title: 'Bid Strategy', desc: 'Margin-aware bidding across Search, Shopping and PMax.' },
      { title: 'Conversion Tracking', desc: 'Clean, verified tracking so reporting numbers hold up.' },
      { title: 'Ongoing Optimization', desc: 'Weekly bid and budget adjustments based on live performance.' }
    ],
    whyTitle: 'Why white-label Google Ads with Funnele',
    whyPoints: [
      { title: 'Margin-aware bidding, not just volume chasing', desc: 'Bid strategy built around your client’s actual product margins, not a generic maximize-conversions default.' },
      { title: 'Clean tracking your reporting can rely on', desc: 'Verified conversion tracking so the numbers you show your client actually hold up under scrutiny.' },
      { title: 'One point of contact, every week', desc: 'A dedicated account lead handles optimization and reporting — no chasing status updates.' }
    ],
    metrics: [
      { label: 'Impressions', value: 80 },
      { label: 'Clicks', value: 60 },
      { label: 'Conv. Rate', value: 70 },
      { label: 'CPC', value: 40 }
    ],
    faqs: [
      { q: 'Which Google Ads campaign types do you manage?', a: 'Search, Shopping and Performance Max — structured around your client’s actual margins rather than a single blended target.' },
      { q: 'Do you need admin access to our client’s account?', a: 'We work off scoped access at whatever level you grant — typically standard user access is enough. NDA and non-compete are signed first.' },
      { q: 'How do you handle conversion tracking?', a: 'We verify existing tracking before touching bids, and rebuild it if it’s unreliable, so the numbers in your reporting actually hold up.' },
      { q: 'How often do you optimize and report?', a: 'Bid and budget adjustments happen weekly based on live performance, with a white-labeled report ready ahead of your client calls.' }
    ]
  },
  {
    slug: 'seo',
    num: '03',
    icon: 'icon-seo',
    name: 'SEO',
    tagline: 'Technical, on-page and content operations.',
    positioning:
      'Technical audits, on-page and content operations — delivered under your agency’s name.',
    summary: 'For accounts that need sustained organic growth, not just a one-time audit.',
    tags: ['Technical audits', 'Content ops'],
    deliverables: [
      { title: 'Technical Audits', desc: 'Site health, crawlability, indexing and core web vitals.' },
      { title: 'On-Page Optimization', desc: 'Metadata, internal linking and content structure.' },
      { title: 'Content Operations', desc: 'Ongoing content production mapped to keyword strategy.' },
      { title: 'Monthly Reporting', desc: 'Ranking movement, traffic trends and next-step recommendations.' }
    ],
    whyTitle: 'Why white-label SEO with Funnele',
    whyPoints: [
      { title: 'Built for sustained growth, not a one-off audit', desc: 'Ongoing technical, on-page and content operations — the kind of continuous work organic growth actually requires.' },
      { title: 'Content mapped to keyword strategy', desc: 'Production tied directly to a defined keyword and ranking plan, not generic blog output.' },
      { title: 'Reporting your client can act on', desc: 'Monthly ranking movement and traffic trends with clear next-step recommendations, delivered under your brand.' }
    ],
    metrics: [
      { label: 'Rankings', value: 55 },
      { label: 'Organic Traffic', value: 75 },
      { label: 'Backlinks', value: 40 },
      { label: 'Page Speed', value: 90 }
    ],
    faqs: [
      { q: 'Do you run one-time audits or ongoing work?', a: 'Ongoing. A single audit rarely moves rankings — we run continuous technical, on-page and content operations against a defined keyword plan.' },
      { q: 'Who writes the content?', a: 'Our content operation, mapped to the keyword strategy we agree with you upfront. Every piece ships under your agency’s byline, not ours.' },
      { q: 'What access do you need to the site?', a: 'CMS or theme access scoped to what’s needed for on-page and technical fixes, plus Search Console and analytics — access agreement signed before we touch anything.' },
      { q: 'What’s in the monthly report?', a: 'Ranking movement, organic traffic trends, and clear next-step recommendations, formatted for you to present as your own.' }
    ]
  },
  {
    slug: 'web-development',
    num: '04',
    icon: 'icon-web',
    name: 'Web Development',
    tagline: 'Shopify builds, landing pages and CRO.',
    positioning:
      'Shopify builds, landing pages and CRO iteration — delivered under your agency’s name.',
    summary: 'Development work delivered on your timeline, tested before it ever reaches your client.',
    tags: ['Shopify builds', 'CRO'],
    deliverables: [
      { title: 'Shopify Builds', desc: 'Full storefront builds and theme customization.' },
      { title: 'Landing Pages', desc: 'Campaign-specific pages built for conversion.' },
      { title: 'CRO Iteration', desc: 'Ongoing testing on layout, copy and checkout flow.' },
      { title: 'QA & Handoff', desc: 'Full testing before any build reaches your client’s live site.' }
    ],
    whyTitle: 'Why white-label Web Development with Funnele',
    whyPoints: [
      { title: 'Tested before your client ever sees it', desc: 'Full QA on every build — layout, checkout flow, and cross-device — before handoff.' },
      { title: 'Built on your timeline', desc: 'Development scoped and delivered against your client deadlines, not a generic dev queue.' },
      { title: 'CRO baked into the build, not bolted on after', desc: 'Landing pages and storefronts built with ongoing conversion testing in mind from day one.' }
    ],
    buildProcess: [
      { num: '01', title: 'Discovery & scoping', desc: 'We map the pages, features and integrations needed, and confirm a fixed timeline before any work starts.' },
      { num: '02', title: 'Wireframes & design', desc: 'Layout and visual design built to your client’s existing brand, delivered for your review before development begins.' },
      { num: '03', title: 'Development', desc: 'Shopify theme build, custom sections, or standalone landing pages, built against the approved design.' },
      { num: '04', title: 'QA & cross-device testing', desc: 'Full pass across browsers, devices and checkout flow before anything is marked ready for review.' },
      { num: '05', title: 'Launch & handoff', desc: 'Site goes live on your client’s domain. Documentation and access handed back to you, not held by us.' }
    ],
    faqs: [
      { q: 'Do you build on Shopify only, or other platforms too?', a: 'Shopify is our primary focus given our ecommerce/DTC specialization, alongside standalone landing pages that plug into any stack.' },
      { q: 'Who reviews the build before it goes live?', a: 'You do. Every build goes through full QA on our end first, then to you for review — nothing reaches your client’s live site unapproved.' },
      { q: 'Can you work inside our existing design system?', a: 'Yes — we build to your client’s existing brand and component patterns rather than imposing a generic template.' },
      { q: 'Is CRO a one-time pass or ongoing?', a: 'Ongoing. Landing pages and storefronts get continued testing on layout, copy and checkout flow after initial launch, not just at handoff.' }
    ]
  }
];

// Shared "who we're built for" content — used on the homepage.
const industries = [
  { icon: 'icon-cart', title: 'DTC & Ecommerce', desc: 'Primary specialization — Shopify storefronts, paid social and search built around product margins.' },
  { icon: 'icon-repeat', title: 'Subscription & Retention', desc: 'Retargeting and lifecycle-aware campaign structures for recurring-revenue accounts.' },
  { icon: 'icon-store', title: 'Marketplace Sellers', desc: 'Google Shopping and cross-channel support for brands selling on and off their own storefront.' },
  { icon: 'icon-layers', title: 'Multi-Brand Portfolios', desc: 'One point of contact managing execution consistently across several client brands at once.' }
];

// Blended, illustrative metrics for the homepage dashboard mockup (aggregate
// across channels — not tied to any single account).
const homeMetrics = [
  { label: 'Total Spend', value: 70 },
  { label: 'Blended ROAS', value: 82 },
  { label: 'Organic Traffic', value: 65 },
  { label: 'Site Conversion', value: 74 }
];

// General white-label FAQs — used on the homepage.
const homeFaqs = [
  { q: 'Will our client know Funnele is involved?', a: 'No. Zero branding appears on dashboards, decks or invoices. NDA and non-compete are signed before we ever touch an account, and client contact stays with you.' },
  { q: 'How is pricing structured?', a: 'Fixed monthly pricing per channel, per account — agreed during scoping. No revenue share and no surprise scope creep.' },
  { q: 'Is there a minimum number of clients or a lock-in contract?', a: 'No minimum client count and no lock-in contract. You bring the accounts you want to offload; we scope and price per account.' },
  { q: 'What if we want to end the partnership?', a: 'Standard offboarding: access is revoked, and any account documentation we’ve built is handed back to you.' }
];

const process = [
  { num: '01', title: 'Discovery call', desc: 'We walk through your current client mix, the channels you want to offload, and where your team’s capacity breaks.' },
  { num: '02', title: 'Scope and pricing', desc: 'Fixed monthly pricing per channel, per account. No revenue share, no surprise scope creep.' },
  { num: '03', title: 'Onboarding and access', desc: 'You grant scoped access to ad accounts and analytics. NDA and non-compete signed before anything is touched.' },
  { num: '04', title: 'Execution', desc: 'Campaigns, builds and reports are produced under your brand. You review before anything reaches your client.' },
  { num: '05', title: 'Ongoing account management', desc: 'A dedicated point of contact on our side, so you’re never chasing status updates.' }
];

module.exports = { services, process, industries, homeFaqs, homeMetrics };
