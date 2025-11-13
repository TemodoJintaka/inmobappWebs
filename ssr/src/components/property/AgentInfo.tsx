// ============================================
// AGENT INFO COMPONENT
// ============================================

import React from 'react';
import { Membership, Franchise } from '../../types';
import { Button } from '../common';

interface AgentInfoProps {
  agent: Membership | null;
  franchise: Franchise;
}

export const AgentInfo: React.FC<AgentInfoProps> = ({ agent, franchise }) => {
  if (!agent) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Información de Contacto</h3>
        <div className="flex items-center space-x-4 mb-4">
          {franchise.logo && (
            <img 
              src={franchise.logo} 
              alt={franchise.name}
              className="w-20 h-20 object-contain"
            />
          )}
          <div>
            <h4 className="text-lg font-semibold text-gray-800">{franchise.name}</h4>
            {franchise.description && (
              <p className="text-sm text-gray-600">{franchise.description}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          {franchise.phone && (
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <a href={`tel:${franchise.phone}`} className="hover:text-blue-600">
                {franchise.phone}
              </a>
            </div>
          )}
          {franchise.email && (
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href={`mailto:${franchise.email}`} className="hover:text-blue-600">
                {franchise.email}
              </a>
            </div>
          )}
          {franchise.address && (
            <div className="flex items-start text-gray-700">
              <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{franchise.address}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Validar que el agente tenga usuario
  if (!agent.user) {
    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">Información de Contacto</h3>
        <div className="flex items-center space-x-4 mb-4">
          {franchise.logo && (
            <img 
              src={franchise.logo} 
              alt={franchise.name}
              className="w-20 h-20 object-contain"
            />
          )}
          <div>
            <h4 className="text-lg font-semibold text-gray-800">{franchise.name}</h4>
            {franchise.description && (
              <p className="text-sm text-gray-600">{franchise.description}</p>
            )}
          </div>
        </div>
        
        <div className="space-y-2">
          {franchise.phone && (
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
              </svg>
              <a href={`tel:${franchise.phone}`} className="hover:text-blue-600">
                {franchise.phone}
              </a>
            </div>
          )}
          {franchise.email && (
            <div className="flex items-center text-gray-700">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
              <a href={`mailto:${franchise.email}`} className="hover:text-blue-600">
                {franchise.email}
              </a>
            </div>
          )}
          {franchise.address && (
            <div className="flex items-start text-gray-700">
              <svg className="w-5 h-5 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span>{franchise.address}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  const { user } = agent;
  const fullName = `${user.first_name || ''} ${user.last_name || ''}`.trim() || 'Agente';

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">Asesor Asignado</h3>
      
      <div className="flex items-center space-x-4 mb-6">
        <div className="w-20 h-20 bg-gray-300 rounded-full overflow-hidden flex-shrink-0">
          {user.avatar ? (
            <img 
              src={user.avatar} 
              alt={fullName}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-2xl font-bold text-gray-600">
              {user.first_name?.[0] || ''}{user.last_name?.[0] || ''}
            </div>
          )}
        </div>
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{fullName}</h4>
          {agent.role && (
            <p className="text-sm text-gray-600">{agent.role}</p>
          )}
          <p className="text-xs text-gray-500 mt-1">{franchise.name}</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        {user.phone && (
          <div className="flex items-center text-gray-700">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <a href={`tel:${user.phone}`} className="hover:text-blue-600">
              {user.phone}
            </a>
          </div>
        )}
        {user.email && (
          <div className="flex items-center text-gray-700">
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
            <a href={`mailto:${user.email}`} className="hover:text-blue-600">
              {user.email}
            </a>
          </div>
        )}
      </div>

      {user.phone && (
        <div className="space-y-2">
          <Button 
            fullWidth
            onClick={() => {
              if (user.phone) {
                window.location.href = `tel:${user.phone}`;
              }
            }}
          >
            Llamar Ahora
          </Button>
          <Button 
            variant="outline"
            fullWidth
            onClick={() => {
              if (user.phone) {
                window.location.href = `https://wa.me/${user.phone.replace(/\D/g, '')}`;
              }
            }}
          >
            WhatsApp
          </Button>
        </div>
      )}
    </div>
  );
};

