import React from 'react';
import { motion } from 'framer-motion';
import { Calendar, CheckCircle, Edit2, Trash2 } from 'lucide-react';
import { SubscriptionPlan } from '@/actions/subscriptions.types';
import { useRouter } from 'next/navigation';

interface AdminSubscriptionCardProps {
  plan: SubscriptionPlan;
  idx: number;
  onDelete: (id: string) => void;
}

const AdminSubscriptionCard: React.FC<AdminSubscriptionCardProps> = ({ plan, idx, onDelete }) => {
    const router = useRouter();

    const handleDelete = (id: string) => {
        onDelete(id);
    }

  return (
    <motion.div
      key={plan.name}
      className="relative cursor-pointer bg-[var(--black)] border border-gray-700 rounded-2xl p-6 flex flex-col items-center text-center shadow-neon"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      whileHover={{ boxShadow: '0 0 20px var(--primary)' }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.2, delay: idx * 0.1 }}
    >
      <div className="mb-4">
        <Calendar className="w-8 h-8 text-[var(--primary)]" />
      </div>
      <h3 className="text-2xl font-semibold mb-2">{plan.name}</h3>
      <p className="text-3xl font-bold mb-4">{plan.currency} {plan.price}</p>
      <ul className="space-y-2 mb-6 w-full">
        {plan.details.map(detail => (
          <li key={detail} className="flex items-center justify-start space-x-2">
            <CheckCircle className="w-5 h-5 text-[var(--primary)]" />
            <span>{detail}</span>
          </li>
        ))}
      </ul>
      <div className="mt-auto flex space-x-4">
        <button
          onClick={() => router.push(`/admin/dashboard/subscriptions/edit/${plan._id}`)}
          className="flex items-center px-4 py-2 bg-[var(--primary)] hover:bg-[var(--primary)]/70 rounded-lg text-white font-medium transition"
        >
          <Edit2 className="w-5 h-5 mr-2" />
          Edit
        </button>
        <button
          className="flex items-center px-4 py-2 bg-red-600 hover:bg-red-700 rounded-lg text-white font-medium transition"
            onClick={() => plan._id && handleDelete(plan._id)}
        >
          <Trash2 className="w-5 h-5 mr-2" />
          Delete
        </button>
      </div>
    </motion.div>
  );
};

export default AdminSubscriptionCard;
