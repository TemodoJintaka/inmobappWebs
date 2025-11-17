// ============================================
// TÉRMINOS Y CONDICIONES PAGE
// ============================================

import React, { useEffect } from 'react';
import { updateMetaTags } from '../utils/seo';

const TermsAndConditions: React.FC = () => {
  useEffect(() => {
    updateMetaTags({
      title: 'Términos y Condiciones - InmobApp',
      description: 'Términos y condiciones de uso de InmobApp. Lea nuestras políticas y regulaciones antes de usar nuestra plataforma.',
      keywords: 'términos y condiciones, políticas, InmobApp, inmobiliaria',
      ogTitle: 'Términos y Condiciones - InmobApp',
      ogDescription: 'Términos y condiciones de uso de InmobApp',
      ogType: 'website',
      canonical: '/terminos-y-condiciones',
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md p-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-8">
            Términos y Condiciones
          </h1>
          
          <div className="text-sm text-gray-600 mb-8">
            <p>Última actualización: {new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
          </div>

          <div className="prose prose-lg max-w-none space-y-8 text-gray-700">
            {/* Introducción */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">1. Introducción</h2>
              <p>
                Bienvenido a InmobApp. Estos términos y condiciones ("Términos") rigen el uso de nuestro sitio web, 
                plataforma y servicios (colectivamente, el "Servicio") operados por InmobApp ("nosotros", "nuestro" o "la Empresa").
              </p>
              <p className="mt-4">
                Al acceder o utilizar nuestro Servicio, usted acepta estar sujeto a estos Términos. 
                Si no está de acuerdo con alguna parte de estos términos, no debe utilizar nuestro Servicio.
              </p>
            </section>

            {/* Aceptación de términos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">2. Aceptación de los Términos</h2>
              <p>
                Al acceder y utilizar InmobApp, usted acepta cumplir con estos Términos y todas las leyes y regulaciones aplicables. 
                Si no acepta estos Términos, le solicitamos que no utilice nuestro Servicio.
              </p>
              <p className="mt-4">
                Estos Términos constituyen un acuerdo legalmente vinculante entre usted y InmobApp. 
                Nos reservamos el derecho de modificar estos Términos en cualquier momento, y dichas modificaciones 
                entrarán en vigor inmediatamente después de su publicación en este sitio web.
              </p>
            </section>

            {/* Definiciones */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">3. Definiciones</h2>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>"Usuario"</strong>: Cualquier persona que acceda o utilice nuestro Servicio.</li>
                <li><strong>"Propietario"</strong>: Persona física o jurídica que publica propiedades en la plataforma.</li>
                <li><strong>"Inmobiliaria"</strong>: Empresa o profesional autorizado que gestiona propiedades en nuestro sistema.</li>
                <li><strong>"Cliente"</strong>: Usuario que busca o consulta propiedades disponibles.</li>
                <li><strong>"Contenido"</strong>: Toda la información, datos, texto, imágenes, fotografías y otros materiales publicados en la plataforma.</li>
                <li><strong>"Servicio"</strong>: Plataforma web y móvil de InmobApp, incluyendo todas sus funcionalidades y servicios relacionados.</li>
              </ul>
            </section>

            {/* Uso del servicio */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">4. Uso del Servicio</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.1. Elegibilidad</h3>
              <p>
                Para utilizar nuestro Servicio, debe ser mayor de edad en su jurisdicción o tener el consentimiento 
                de sus padres o tutores legales. Al utilizar el Servicio, usted declara y garantiza que tiene la capacidad 
                legal para celebrar estos Términos.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.2. Uso Permitido</h3>
              <p>Usted puede utilizar nuestro Servicio únicamente para:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Buscar y consultar información sobre propiedades inmobiliarias</li>
                <li>Publicar propiedades (si es propietario o inmobiliaria autorizada)</li>
                <li>Contactar con propietarios o inmobiliarias mediante los canales proporcionados</li>
                <li>Utilizar las herramientas de búsqueda y filtrado disponibles</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">4.3. Uso Prohibido</h3>
              <p>Está estrictamente prohibido:</p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Utilizar el Servicio de manera fraudulenta o para actividades ilegales</li>
                <li>Publicar información falsa, engañosa o inexacta sobre propiedades</li>
                <li>Suplantar la identidad de otra persona o entidad</li>
                <li>Interferir con el funcionamiento del Servicio o intentar acceder a áreas no autorizadas</li>
                <li>Realizar ingeniería inversa, descompilar o desmontar cualquier parte del Servicio</li>
                <li>Utilizar robots, spiders u otros dispositivos automatizados para acceder al Servicio sin autorización</li>
                <li>Vender, alquilar o sublicenciar el acceso al Servicio</li>
                <li>Transmitir virus, malware o cualquier código dañino</li>
                <li>Violar derechos de propiedad intelectual de terceros</li>
                <li>Realizar actividades que puedan dañar la reputación de InmobApp o sus usuarios</li>
              </ul>
            </section>

            {/* Cuentas de usuario */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">5. Cuentas de Usuario</h2>
              <p>
                Para acceder a ciertas funcionalidades del Servicio, puede ser necesario crear una cuenta. 
                Usted es responsable de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Mantener la confidencialidad de sus credenciales de acceso</li>
                <li>Proporcionar información precisa, actual y completa</li>
                <li>Notificarnos inmediatamente sobre cualquier uso no autorizado de su cuenta</li>
                <li>Aceptar toda la responsabilidad por las actividades que ocurran bajo su cuenta</li>
              </ul>
              <p className="mt-4">
                Nos reservamos el derecho de suspender o cancelar su cuenta si detectamos violaciones de estos Términos 
                o actividades sospechosas.
              </p>
            </section>

            {/* Publicación de propiedades */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">6. Publicación de Propiedades</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.1. Responsabilidades del Propietario</h3>
              <p>
                Si publica propiedades en nuestra plataforma, usted se compromete a:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Proporcionar información precisa, actual y completa sobre las propiedades</li>
                <li>Incluir fotografías reales y actuales de las propiedades</li>
                <li>Actualizar inmediatamente cualquier cambio en el estado, precio o disponibilidad de las propiedades</li>
                <li>Tener la autoridad legal para ofrecer la propiedad en venta o alquiler</li>
                <li>Respetar todas las leyes y regulaciones aplicables a la venta o alquiler de propiedades</li>
                <li>Responder de manera oportuna a las consultas de clientes potenciales</li>
              </ul>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.2. Contenido de Propiedades</h3>
              <p>
                Usted conserva todos los derechos de propiedad sobre el contenido que publique. Sin embargo, 
                al publicar contenido en nuestra plataforma, nos otorga una licencia no exclusiva, mundial, 
                libre de regalías y transferible para usar, reproducir, modificar, adaptar y mostrar dicho contenido 
                en relación con el Servicio.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">6.3. Modificación y Eliminación</h3>
              <p>
                Nos reservamos el derecho de revisar, modificar o eliminar cualquier publicación de propiedad que 
                consideremos que viola estos Términos o que sea inapropiada, sin previo aviso.
              </p>
            </section>

            {/* Propiedad intelectual */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">7. Propiedad Intelectual</h2>
              <p>
                El Servicio y todo su contenido, incluyendo pero no limitado a texto, gráficos, logotipos, iconos, 
                imágenes, clips de audio, descargas digitales y compilaciones de datos, son propiedad de InmobApp 
                o de sus proveedores de contenido y están protegidos por leyes de derechos de autor y otras leyes 
                de propiedad intelectual.
              </p>
              <p className="mt-4">
                No se otorga ninguna licencia o derecho para usar ninguna marca comercial, marca de servicio o logotipo 
                de InmobApp sin nuestro consentimiento previo por escrito.
              </p>
            </section>

            {/* Privacidad y protección de datos */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">8. Privacidad y Protección de Datos</h2>
              <p>
                La protección de su privacidad es importante para nosotros. El uso de su información personal está 
                regido por nuestra Política de Privacidad, que forma parte integral de estos Términos. 
                Al utilizar nuestro Servicio, usted acepta la recopilación y el uso de información de acuerdo con 
                nuestra Política de Privacidad.
              </p>
              <p className="mt-4">
                Nos comprometemos a proteger sus datos personales de acuerdo con las leyes de protección de datos 
                aplicables, incluyendo el Reglamento General de Protección de Datos (RGPD) cuando sea aplicable.
              </p>
            </section>

            {/* Disponibilidad del servicio */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">9. Disponibilidad del Servicio</h2>
              <p>
                Nos esforzamos por mantener el Servicio disponible de forma continua, pero no garantizamos que estará 
                disponible sin interrupciones o errores. Podemos realizar mantenimiento programado o de emergencia que 
                puede resultar en interrupciones temporales del Servicio.
              </p>
              <p className="mt-4">
                No seremos responsables por ninguna pérdida o daño que pueda resultar de la indisponibilidad temporal 
                del Servicio.
              </p>
            </section>

            {/* Limitación de responsabilidad */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">10. Limitación de Responsabilidad</h2>
              <p>
                InmobApp actúa como intermediario entre propietarios/inmobiliarias y clientes. No somos responsables de:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>La exactitud, veracidad o integridad de la información proporcionada por los usuarios</li>
                <li>Las transacciones entre propietarios y clientes</li>
                <li>El estado físico o legal de las propiedades listadas</li>
                <li>La conducta de cualquier usuario del Servicio</li>
                <li>Pérdidas o daños resultantes del uso o la imposibilidad de usar el Servicio</li>
                <li>Decisiones comerciales basadas en información obtenida a través del Servicio</li>
              </ul>
              <p className="mt-4">
                En ningún caso InmobApp será responsable por daños indirectos, incidentales, especiales, 
                consecuentes o punitivos, incluyendo pero no limitado a pérdida de beneficios, datos o uso.
              </p>
            </section>

            {/* Indemnización */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">11. Indemnización</h2>
              <p>
                Usted acepta indemnizar, defender y eximir de responsabilidad a InmobApp, sus afiliados, directores, 
                empleados y agentes de cualquier reclamo, demanda, pérdida, responsabilidad y gasto (incluyendo honorarios 
                legales) que surjan de o estén relacionados con:
              </p>
              <ul className="list-disc pl-6 space-y-2 mt-2">
                <li>Su uso del Servicio</li>
                <li>Su violación de estos Términos</li>
                <li>Su violación de los derechos de terceros</li>
                <li>El contenido que publique en la plataforma</li>
              </ul>
            </section>

            {/* Modificaciones del servicio */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">12. Modificaciones del Servicio</h2>
              <p>
                Nos reservamos el derecho de modificar, suspender o discontinuar cualquier aspecto del Servicio en 
                cualquier momento, con o sin previo aviso. Podemos realizar cambios en las funcionalidades, 
                características o disponibilidad del Servicio a nuestra discreción.
              </p>
            </section>

            {/* Enlaces a sitios de terceros */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">13. Enlaces a Sitios de Terceros</h2>
              <p>
                Nuestro Servicio puede contener enlaces a sitios web de terceros que no están bajo nuestro control. 
                No tenemos control sobre y no asumimos responsabilidad por el contenido, políticas de privacidad o 
                prácticas de sitios web de terceros. Al hacer clic en un enlace a un sitio de terceros, usted acepta 
                que lo hace bajo su propio riesgo.
              </p>
            </section>

            {/* Terminación */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">14. Terminación</h2>
              <p>
                Podemos terminar o suspender su acceso al Servicio inmediatamente, sin previo aviso o responsabilidad, 
                por cualquier motivo, incluyendo pero no limitado a una violación de estos Términos.
              </p>
              <p className="mt-4">
                Al terminar, su derecho a utilizar el Servicio cesará inmediatamente. Las disposiciones de estos Términos 
                que por su naturaleza deben sobrevivir, incluyendo las secciones de Propiedad Intelectual, 
                Limitación de Responsabilidad e Indemnización, continuarán en vigor después de la terminación.
              </p>
            </section>

            {/* Ley aplicable y jurisdicción */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">15. Ley Aplicable y Jurisdicción</h2>
              <p>
                Estos Términos se regirán e interpretarán de acuerdo con las leyes de [Jurisdicción], sin tener en cuenta 
                sus disposiciones sobre conflictos de leyes. Cualquier disputa que surja de o esté relacionada con estos 
                Términos será sometida a la jurisdicción exclusiva de los tribunales de [Ciudad, Jurisdicción].
              </p>
            </section>

            {/* Disposiciones generales */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">16. Disposiciones Generales</h2>
              
              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">16.1. Integridad del Acuerdo</h3>
              <p>
                Estos Términos, junto con nuestra Política de Privacidad, constituyen el acuerdo completo entre usted 
                y InmobApp respecto al uso del Servicio.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">16.2. Renuncia</h3>
              <p>
                El hecho de que no ejerzamos cualquier derecho o disposición de estos Términos no constituirá una 
                renuncia a tal derecho o disposición.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">16.3. Divisibilidad</h3>
              <p>
                Si alguna disposición de estos Términos se considera inválida o inaplicable, las disposiciones restantes 
                permanecerán en pleno vigor y efecto.
              </p>

              <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-3">16.4. Asignación</h3>
              <p>
                No puede transferir o asignar estos Términos o sus derechos u obligaciones aquí contenidos sin nuestro 
                consentimiento previo por escrito. Podemos asignar estos Términos sin restricción.
              </p>
            </section>

            {/* Contacto */}
            <section>
              <h2 className="text-2xl font-bold text-gray-800 mb-4">17. Contacto</h2>
              <p>
                Si tiene preguntas sobre estos Términos y Condiciones, por favor contáctenos a través de:
              </p>
              <ul className="list-none pl-0 space-y-2 mt-4">
                <li><strong>Email:</strong> legal@inmobapp.com</li>
                <li><strong>Teléfono:</strong> [Número de contacto]</li>
                <li><strong>Dirección:</strong> [Dirección de la empresa]</li>
              </ul>
            </section>

            {/* Reconocimiento */}
            <section className="mt-8 pt-8 border-t border-gray-300">
              <p className="text-sm text-gray-600">
                Al utilizar nuestro Servicio, usted reconoce que ha leído, entendido y acepta estar sujeto a estos 
                Términos y Condiciones. Si no está de acuerdo con estos Términos, le recomendamos que no utilice 
                nuestro Servicio.
              </p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsAndConditions;

