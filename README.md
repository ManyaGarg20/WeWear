# WeWear - Sustainable Second-Hand Fashion Marketplace

🌱 **Give Your Wardrobe a Second Life** - WeWear is a sustainable fashion marketplace where you can sell old clothes, wardrobe clearance items, and pre-owned fashion in good condition. Earn money while helping reduce fashion waste and making style accessible on a budget.

Built with React, TypeScript, and Tailwind CSS, WeWear provides a seamless shopping experience for conscious consumers and an easy platform for sellers to turn their unused clothing into cash.

## 🌟 Features

### Buyer Features
- **Browse & Search**: Discover pre-owned fashion items with advanced filtering by size, brand, condition, and price
- **Product Details**: View detailed product information, multiple photos, condition ratings, and authentic seller reviews
- **Wishlist/Favorites**: Save favorite items for later
- **Smart Shopping**: Filter by price range, brand, size, condition (Like New, Good, Fair)
- **User Accounts**: Create profiles, manage purchase history, and track favorite sellers
- **Seller Profiles**: View seller reputation, ratings, and product collections
- **User Dashboard**: Track orders, saved addresses, purchase history, and reviews

### Seller Features (Wardrobe Clearance)
- **Become a Seller**: Easy registration to start earning from your unused clothes
- **List Products**: Simple process to upload wardrobe items with photos and condition details
- **Seller Dashboard**: Manage inventory, track sales, and monitor earnings (coming soon)
- **Condition Rating**: Mark items as Like New, Good, or Fair Condition
- **Analytics**: Track which items sell best and optimize your listings
- **Payment & Payouts**: Transparent commission structure and easy withdrawal of earnings
- **Support**: Access seller guides and customer support

## 🛠️ Tech Stack

- **Frontend Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 5.4.2
- **Styling**: Tailwind CSS 3.4.1 with PostCSS
- **Routing**: React Router DOM 6.22.3
- **Icons**: Lucide React 0.344.0
- **Backend/Database**: Firebase 11.9.1
- **Linting**: ESLint
- **Data Generation**: UUID 11.1.0

## 📁 Project Structure

```
├── src/
│   ├── components/
│   │   ├── filter/
│   │   │   └── FilterSidebar.tsx
│   │   ├── layout/
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   └── product/
│   │       ├── ProductCard.tsx
│   │       └── ProductGrid.tsx
│   ├── context/
│   │   ├── AuthContext.tsx  (Authentication)
│   │   ├── CartContext.tsx  (Shopping cart state)
│   │   ├── FavoritesContext.tsx  (Wishlist)
│   │   └── Firebase.ts  (Firebase configuration)
│   ├── data/
│   │   ├── mockApi.ts  (Mock API functions)
│   │   └── mockData.ts  (Sample product data)
│   ├── pages/
│   │   ├── BecomeSellerPage.tsx  (Seller registration)
│   │   ├── BrowsePage.tsx  (Product browsing)
│   │   ├── CartPage.tsx  (Shopping cart)
│   │   ├── Favorites.tsx  (Wishlist)
│   │   ├── HomePage.tsx  (Landing page)
│   │   ├── LoginPage.tsx  (User login)
│   │   ├── ProductPage.tsx  (Product details)
│   │   ├── SellerProfilePage.tsx  (Seller info)
│   │   ├── SignupPage.tsx  (User registration)
│   │   └── UserDashboardPage.tsx  (User profile)
│   ├── types/
│   │   ├── Product.ts  (Product type definitions)
│   │   └── User.ts  (User type definitions)
│   ├── App.tsx  (Main app component)
│   ├── main.tsx  (Entry point)
│   └── index.css  (Global styles)
├── public/  (Static assets)
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── vite.config.ts
├── eslint.config.js
└── postcss.config.js
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd projectBoltWewear/project
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure Firebase** (Optional)
   - Update Firebase configuration in `src/context/Firebase.ts` with your credentials

4. **Start development server**
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173`

### Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory.

### Preview Production Build

```bash
npm run preview
```

## 🌍 Mission & Values

**WeWear's Mission**: To make sustainable fashion accessible while empowering individuals to earn money from their wardrobe clearance.

### Why WeWear?
- **Sustainable**: Reduce fashion waste by giving clothes a second life
- **Budget-Friendly**: Shop quality fashion at 30-70% off retail prices
- **Easy Money**: Declutter your wardrobe and earn cash from unused clothes
- **Trustworthy**: Verified sellers with authentic condition ratings and reviews
- **Eco-Conscious**: Every transaction contributes to reducing textile waste

### Environmental Impact
Fast fashion produces massive textile waste. WeWear helps by:
- Extending the lifecycle of clothing items
- Reducing demand for new production
- Minimizing textile waste in landfills
- Creating a circular economy for fashion

## � Platform Screenshots

Add your deployment screenshots here to showcase WeWear in action!

### Homepage
![WeWear Homepage](./screenshots/homepage.png)
*Landing page with featured products and categories*

### Browse & Search
![Browse Page](./screenshots/browse.png)
*Browse products with advanced filters by price, brand, size, and condition*

### Product Details
![Product Page](./screenshots/product_page.png)
*Detailed product view with seller information and condition ratings*

### Seller Page
![Seller Page](./screenshots/seller-page.png)
*View seller reputation, ratings, and product collections*

### Shopping Cart
![Cart Page](./screenshots/cart-page.png)
*Manage items and proceed to checkout*

---

**📁 Screenshots Folder**: All images are stored in the `./screenshots/` directory. Add your PNG/JPG files there and they will display automatically.

## �📋 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint to check code quality |

## 📱 Pages Overview

### Public Pages
- **Home Page** (`/`) - Landing page with featured products and categories
- **Browse Page** (`/browse`) - Browse all products with filtering
- **Product Page** (`/product/:id`) - Detailed product information
- **Seller Profile** (`/seller/:id`) - Seller store and product listings
- **Login** (`/login`) - User authentication
- **Signup** (`/signup`) - New user registration

### Protected Pages (Login Required)
- **Cart** (`/cart`) - Shopping cart management
- **Favorites** (`/favorites`) - Saved wishlist items
- **User Dashboard** (`/dashboard`) - Profile and order management

### Seller Pages
- **Become Seller** (`/become-seller`) - Seller registration (Coming Soon)

## 🎨 Styling

The project uses **Tailwind CSS** for styling with a utility-first approach. Key features:
- Responsive design (mobile-first)
- Dark/light theme support ready
- Consistent color scheme and spacing
- Reusable component classes

### Tailwind Configuration
Located in `tailwind.config.js` - customize colors, fonts, and breakpoints here.

## 🔐 State Management

### Context API
The app uses React Context API for state management:

1. **AuthContext** - User authentication state
2. **CartContext** - Shopping cart items and operations
3. **FavoritesContext** - Wishlist/favorites management

## 📊 Mock Data

The app includes mock data for development:
- Sample products with images, prices, and ratings
- Mock user data
- Mock seller information

Mock data is initialized on app startup in `App.tsx`.

## 🔄 API Integration

### Mock API Functions
Located in `src/data/mockApi.ts`:
- Product fetching
- User authentication
- Order management
- Seller operations

**Ready to integrate** with real backend APIs by replacing mock functions.

## 🐛 Linting

Code quality is maintained with ESLint:

```bash
npm run lint
```

Configuration available in `eslint.config.js`

## 📦 Dependencies

### Production
- **react** - UI library
- **react-dom** - React DOM rendering
- **react-router-dom** - Client-side routing
- **firebase** - Backend services
- **tailwindcss** - Styling framework
- **lucide-react** - Icon library
- **uuid** - Unique ID generation

### Development
- **typescript** - Type safety
- **vite** - Fast build tool
- **eslint** - Code linting
- **autoprefixer** - CSS vendor prefixes

## 🚀 Future Enhancements

- [ ] Real Firebase integration for production
- [ ] Payment gateway integration (Stripe, Razorpay)
- [ ] Email notifications
- [ ] Size & fit recommendation system
- [ ] Seller dashboard with detailed analytics
- [ ] Real-time chat support between buyers and sellers
- [ ] Advanced search with AI-powered recommendations
- [ ] Condition verification system
- [ ] Brand authentication for luxury items
- [ ] Mobile app (React Native)
- [ ] Social features (follow sellers, share items)
- [ ] Bulk listing tools for efficient wardrobe clearance
- [ ] Sustainability impact tracker (CO₂ saved, waste avoided)

## 📝 Environment Variables

Create a `.env` file in the root directory (if needed for Firebase):

```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Create a feature branch (`git checkout -b feature/YourFeature`)
2. Commit your changes (`git commit -m 'Add YourFeature'`)
3. Push to the branch (`git push origin feature/YourFeature`)
4. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Support

For issues, questions, or suggestions, please create an issue in the repository.

## 🙏 Acknowledgments

- Built with [React](https://react.dev/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- Build tool: [Vite](https://vitejs.dev/)
- Powered by [Firebase](https://firebase.google.com/)

---

**Happy coding!** 🎉
