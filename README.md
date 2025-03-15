# Income Shield

## Financial Protection for Tech Professionals During Layoffs

Income Shield provides financial security for tech professionals with layoff insurance that replaces a portion of your income when you need it most. Our service is designed specifically for the tech industry, offering coverage plans that help software engineers, product managers, designers, data scientists, and other tech professionals maintain financial stability during job transitions.

## Features

- **Fast Claims Processing**: Get financial support quickly when you need it most
- **No Paperwork**: Streamlined digital claims process
- **Automated Payouts**: Regular payments during your coverage period
- **Salary Protection**: Replace up to 80% of your income if laid off
- **Tech-Focused**: Designed specifically for technology professionals
- **Affordable Rates**: Flexible premium options based on your needs

## Coverage Plans

Income Shield offers three flexible coverage options to match your financial needs:

- **Basic**: 3-month coverage with essential benefits
- **Standard**: 6-month coverage with enhanced benefits
- **Executive**: 9-month coverage with comprehensive benefits

All plans include varying levels of salary replacement, claim processing times, and additional career services such as resume review, interview preparation, and access to networking events.

## Technology Stack

Income Shield is built with modern web technologies:

- **Frontend**: Next.js, React, TypeScript, Tailwind CSS
- **UI Components**: Shadcn UI
- **Internationalization**: Next-intl (English and French supported)
- **Deployment**: Vercel (or your preferred hosting platform)

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/income-shield.git
cd income-shield
```

2. Install dependencies
```bash
npm install
# or
yarn install
```

3. Run the development server
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application

## Project Structure

- `src/app/[locale]/(unauth)` - Landing page and public routes
- `src/app/[locale]/(auth)` - Protected dashboard routes
- `src/app/[locale]/(unauth)/calculator` - Premium calculator tool
- `src/templates` - Reusable page sections (Hero, Features, etc.)
- `src/components` - UI components
- `src/locales` - Internationalization files (en.json, fr.json)

## Building for Production

```bash
npm run build
# or
yarn build
```

## Deployment

The application can be deployed to Vercel with a single command:

```bash
npm run deploy
# or
yarn deploy
```

## Contributing

Contributions to Income Shield are welcome! Please feel free to submit a Pull Request.
