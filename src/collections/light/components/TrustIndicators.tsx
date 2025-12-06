import { Truck, ShieldCheck, RefreshCw, CreditCard } from 'lucide-react';

const features = [
    {
        icon: Truck,
        title: 'Envío Gratis',
        description: 'A casi todo México'
    },
    {
        icon: ShieldCheck,
        title: 'Pago Seguro',
        description: 'Procesamiento 100% seguro'
    },
    {
        icon: RefreshCw,
        title: 'Devoluciones Gratis',
        description: 'Garantía de 30 días'
    },
    {
        icon: CreditCard,
        title: 'Pago Flexible',
        description: 'Paga con múltiples tarjetas'
    }
];

export const TrustIndicators = () => {
    return (
        <section className="py-12 border-t border-gray-100 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-colors duration-300">
                            <div className="p-3 bg-accent/10 rounded-xl text-accent">
                                <feature.icon className="w-6 h-6" />
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900">{feature.title}</h3>
                                <p className="text-sm text-slate-500">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
