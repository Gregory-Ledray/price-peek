import React from 'react';
import { Star } from 'lucide-react';
import { motion } from 'motion/react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  key?: React.Key;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getRetailerFromUrl = (url: string) => {
    const retailers = [
      { name: 'WALMART', domains: ['walmart.com'] },
      { name: 'TARGET', domains: ['target.com'] },
      { name: 'AMAZON', domains: ['amazon.com'] },
      { name: 'GOOGLE', domains: ['google.com'] },
      { name: 'APPLE', domains: ['apple.com'] },
      { name: 'EBAY', domains: ['ebay.com'] },
      { name: 'HOME DEPOT', domains: ['homedepot.com'] },
      { name: 'COSTCO', domains: ['costco.com'] },
      { name: 'KROGER', domains: ['kroger.com'] },
      { name: 'BEST BUY', domains: ['bestbuy.com'] },
      { name: 'CHEWY', domains: ['chewy.com'] },
      { name: 'TEMU', domains: ['temu.com'] },
      { name: 'SHEIN', domains: ['shein.com'] },
      { name: 'WAYFAIR', domains: ['wayfair.com'] },
      { name: 'CVS', domains: ['cvs.com'] },
      { name: 'WALGREENS', domains: ['walgreens.com'] },
      { name: 'LOWES', domains: ['lowes.com'] },
      { name: 'O\'REILLY', domains: ['oreillyauto.com'] },
      { name: 'AUTOZONE', domains: ['autozone.com'] },
      { name: 'KOHLS', domains: ['kohls.com'] },
      { name: 'TRACTOR SUPPLY', domains: ['tractorsupply.com'] },
      { name: 'NORDSTROM', domains: ['nordstrom.com'] },
      { name: 'DICKS', domains: ['dickssportinggoods.com'] },
      { name: 'GAP', domains: ['gap.com'] },
      { name: 'MENARDS', domains: ['menards.com'] },
      { name: 'WEGMANS', domains: ['wegmans.com'] },
      { name: 'SHERWIN-WILLIAMS', domains: ['sherwin-williams.com'] },
      { name: 'HARBOR FREIGHT', domains: ['harborfreight.com'] },
      { name: 'WILLIAMS-SONOMA', domains: ['williams-sonoma.com'] },
      { name: 'BASS PRO SHOPS', domains: ['basspro.com'] },
      { name: 'LULULEMON', domains: ['lululemon.com'] },
      { name: 'DELL', domains: ['dell.com'] },
      { name: 'HOBBY LOBBY', domains: ['hobbylobby.com'] },
      { name: 'DISCOUNT TIRE', domains: ['discounttire.com'] },
      { name: 'BATH & BODY WORKS', domains: ['bathandbodyworks.com'] },
      { name: 'JCPENNEY', domains: ['jcpenney.com'] },
      { name: 'DILLARDS', domains: ['dillards.com'] },
      { name: 'SIGNET', domains: ['signetjewelers.com'] },
      { name: 'TRUE VALUE', domains: ['truevalue.com'] },
      { name: 'JD SPORTS', domains: ['jdsports.com'] },
      { name: 'CAMPING WORLD', domains: ['campingworld.com'] },
      { name: 'STAPLES', domains: ['staples.com'] },
      { name: 'TOTAL WINE', domains: ['totalwine.com'] },
      { name: 'PETCO', domains: ['petco.com'] },
      { name: 'ACADEMY SPORTS', domains: ['academy.com'] },
      { name: 'PIGGLY WIGGLY', domains: ['pigglywiggly.com'] },
      { name: 'IKEA', domains: ['ikea.com'] },
      { name: 'VICTORIA\'S SECRET', domains: ['victoriassecret.com'] },
      { name: 'MARKET BASKET', domains: ['shopmarketbasket.com'] },
      { name: 'FOOT LOCKER', domains: ['footlocker.com'] },
      { name: 'MICHAELS', domains: ['michaels.com'] },
      { name: 'HUDSON\'S BAY', domains: ['thebay.com'] },
      { name: 'STATER BROS', domains: ['staterbros.com'] },
      { name: 'INGLES', domains: ['ingles-markets.com'] },
      { name: 'OVERSTOCK', domains: ['overstock.com'] },
      { name: 'NEIMAN MARCUS', domains: ['neimanmarcus.com'] },
      { name: 'ADVANCE AUTO', domains: ['advanceautoparts.com'] },
      { name: 'AMERICAN EAGLE', domains: ['ae.com'] },
      { name: 'WEIS MARKETS', domains: ['weismarkets.com'] },
      { name: 'GROCERY OUTLET', domains: ['groceryoutlet.com'] },
      { name: 'SAVE-A-LOT', domains: ['savealot.com'] },
      { name: 'URBAN OUTFITTERS', domains: ['urbanoutfitters.com'] },
      { name: 'TAPESTRY', domains: ['tapestry.com'] },
      { name: 'SAVE MART', domains: ['savemart.com'] },
      { name: 'SCHNUCKS', domains: ['schnucks.com'] },
    ];

    const match = retailers.find(r => r.domains.some(domain => url.includes(domain)));
    return match ? match.name : 'RETAILER';
  };

  const retailer = getRetailerFromUrl(product.offers.url);
  
  const getRetailerStyles = (retailer: string) => {
    const colors: Record<string, string> = {
      'WALMART': 'bg-[#0071CE] text-white',
      'TARGET': 'bg-[#CC0000] text-white',
      'AMAZON': 'bg-[#FF9900] text-black',
      'GOOGLE': 'bg-[#4285F4] text-white',
      'APPLE': 'bg-[#000000] text-white',
      'EBAY': 'bg-[#0064D2] text-white',
      'HOME DEPOT': 'bg-[#F96302] text-white',
      'COSTCO': 'bg-[#005DAA] text-white',
      'KROGER': 'bg-[#004990] text-white',
      'BEST BUY': 'bg-[#0046BE] text-white',
      'CHEWY': 'bg-[#FF9000] text-white',
      'TEMU': 'bg-[#FF6600] text-white',
      'SHEIN': 'bg-[#000000] text-white',
      'WAYFAIR': 'bg-[#7F187F] text-white',
      'CVS': 'bg-[#CC0000] text-white',
      'WALGREENS': 'bg-[#E31837] text-white',
      'LOWES': 'bg-[#004990] text-white',
      'O\'REILLY': 'bg-[#009A44] text-white',
      'AUTOZONE': 'bg-[#FF6600] text-white',
      'KOHLS': 'bg-[#C2002F] text-white',
      'TRACTOR SUPPLY': 'bg-[#ED1C24] text-white',
      'NORDSTROM': 'bg-[#000000] text-white',
      'DICKS': 'bg-[#F26722] text-white',
      'GAP': 'bg-[#000033] text-white',
      'MENARDS': 'bg-[#006B3F] text-white',
      'WEGMANS': 'bg-[#000000] text-white',
      'SHERWIN-WILLIAMS': 'bg-[#005596] text-white',
      'HARBOR FREIGHT': 'bg-[#CC0000] text-white',
      'WILLIAMS-SONOMA': 'bg-[#000000] text-white',
      'BASS PRO SHOPS': 'bg-[#004B33] text-white',
      'LULULEMON': 'bg-[#D4001F] text-white',
      'DELL': 'bg-[#007DB8] text-white',
      'HOBBY LOBBY': 'bg-[#002D62] text-white',
      'DISCOUNT TIRE': 'bg-[#BD1E2D] text-white',
      'BATH & BODY WORKS': 'bg-[#0072CE] text-white',
      'JCPENNEY': 'bg-[#CC0000] text-white',
      'DILLARDS': 'bg-[#000000] text-white',
      'SIGNET': 'bg-[#000000] text-white',
      'TRUE VALUE': 'bg-[#ED1C24] text-white',
      'JD SPORTS': 'bg-[#000000] text-white',
      'CAMPING WORLD': 'bg-[#0072CE] text-white',
      'STAPLES': 'bg-[#CC0000] text-white',
      'TOTAL WINE': 'bg-[#9A0000] text-white',
      'PETCO': 'bg-[#003D99] text-white',
      'ACADEMY SPORTS': 'bg-[#002951] text-white',
      'PIGGLY WIGGLY': 'bg-[#ED1C24] text-white',
      'IKEA': 'bg-[#0051BA] text-white',
      'VICTORIA\'S SECRET': 'bg-[#EE145B] text-white',
      'MARKET BASKET': 'bg-[#E31837] text-white',
      'FOOT LOCKER': 'bg-[#000000] text-white',
      'MICHAELS': 'bg-[#D4001A] text-white',
      'HUDSON\'S BAY': 'bg-[#000000] text-white',
      'STATER BROS': 'bg-[#E31837] text-white',
      'INGLES': 'bg-[#ED1C24] text-white',
      'OVERSTOCK': 'bg-[#C72027] text-white',
      'NEIMAN MARCUS': 'bg-[#000000] text-white',
      'ADVANCE AUTO': 'bg-[#FF0000] text-white',
      'AMERICAN EAGLE': 'bg-[#000000] text-white',
      'WEIS MARKETS': 'bg-[#D21245] text-white',
      'GROCERY OUTLET': 'bg-[#ED1B24] text-white',
      'SAVE-A-LOT': 'bg-[#0B5B9D] text-white',
      'URBAN OUTFITTERS': 'bg-[#000000] text-white',
      'TAPESTRY': 'bg-[#000000] text-white',
      'SAVE MART': 'bg-[#FF6B00] text-white',
      'SCHNUCKS': 'bg-[#E31E24] text-white',
    };

    return colors[retailer] || 'bg-gray-500 text-white';
  };

  const badgeStyles = getRetailerStyles(retailer);

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ borderColor: '#404040' }}
      className="flex-none w-[240px] bg-surface-container-high border border-outline-variant rounded-lg p-3 snap-start transition-colors group cursor-pointer"
    >
      <div className="relative mb-2">
        <img 
          src={product.image[0]} 
          alt={product.name}
          className="w-full h-32 object-contain bg-white rounded-sm"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-1 left-1 flex gap-1">
          <span className={`${badgeStyles} text-[9px] font-bold px-1.5 py-0.5 rounded uppercase`}>
            {retailer}
          </span>
        </div>
      </div>

      <h3 className="font-semibold text-[13px] text-white line-clamp-1 mb-0.5">
        {product.name}
      </h3>

      <div className="flex items-center gap-1 mb-2">
        <span className="text-[12px] text-on-surface-variant">{product.brand.name}</span>
        <Star size={14} className="fill-accent text-accent" />
        <span className="text-[12px] text-white font-semibold">{product.aggregateRating.ratingValue}</span>
        <span className="text-[12px] text-on-surface-variant">({product.aggregateRating.reviewCount.toLocaleString()})</span>
      </div>

      <p className="text-[12px] text-on-surface-variant line-clamp-2 mb-3 h-8 leading-snug">
        {product.description}
      </p>

      <div className="flex items-center justify-between mt-auto">
        <span className="font-price text-[18px] font-bold text-white">
          ${product.offers.price.toFixed(2)}
        </span>
        <motion.button 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-accent text-black text-[11px] font-bold uppercase tracking-widest px-3 py-1.5 rounded-sm transition-transform"
        >
          View Deal
        </motion.button>
      </div>
    </motion.div>
  );
}
