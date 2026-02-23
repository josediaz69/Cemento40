
import React from 'react';

interface ServiceCardProps {
  title: string;
  description: string;
  image?: string;
  icon?: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ title, description, image, icon }) => {
  return (
    <div className="group flex flex-col gap-4 bg-white p-2 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-gray-200/50 border border-transparent hover:border-gray-100">
      {image ? (
        <div className="w-full aspect-video rounded-xl bg-gray-100 overflow-hidden relative">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      ) : icon ? (
        <div className="bg-gray-50 w-14 h-14 rounded-xl flex items-center justify-center mb-1 group-hover:bg-primary group-hover:text-white transition-all duration-300 shadow-sm">
          <span className="material-symbols-outlined text-[28px]">{icon}</span>
        </div>
      ) : null}
      
      <div className={icon ? "" : "px-3 pb-3"}>
        <h3 className="text-gray-900 text-lg font-extrabold mb-1.5 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-gray-500 text-[14px] leading-relaxed font-medium">{description}</p>
      </div>
    </div>
  );
};

export default ServiceCard;
