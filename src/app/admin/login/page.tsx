'use client';

import { FormEvent, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { motion, Variants } from 'framer-motion';
import { Loader2 } from 'lucide-react';

const formVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Login() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError('');
    setLoading(true);
    const formData = new FormData(event.currentTarget);
    const res = await signIn('credentials', {
      email: formData.get('email'),
      password: formData.get('password'),
      redirect: false,
    });
    setLoading(false);

    if (res?.error) setError(res.error as string);
    else if (res?.ok) router.push('/admin/dashboard');
  };

  return (
    <motion.section
      className="relative bg-[var(--black)] min-h-screen flex items-center justify-center overflow-hidden"
      initial="hidden"
      animate="visible"
      variants={formVariant}
    >
      {/* Decorative pulses */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-[var(--primary)] opacity-20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-12 right-12 w-48 h-48 bg-[var(--primary)] opacity-15 rounded-full blur-2xl animate-pulse" />
      </div>

      <motion.form
        onSubmit={handleSubmit}
        className="relative z-10 w-full max-w-md bg-black border mx-2 border-[#222] rounded-2xl p-8 shadow-[0_0_20px_var(--primary)] hover:shadow-[0_0_30px_var(--primary)] transition-shadow duration-300 flex flex-col gap-4"
        initial="hidden"
        animate="visible"
        variants={formVariant}
      >
        <h1 className="text-3xl font-extrabold text-white mb-4">Admin Login</h1>

        {error && <div className="text-red-400 text-sm">{error}</div>}

        <label className="text-gray-300 text-sm">Email</label>
        <input
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full h-10 px-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          required
        />

        <label className="text-gray-300 text-sm">Password</label>
        <input
          name="password"
          type="password"
          placeholder="••••••••"
          className="w-full h-10 px-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-50 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[var(--primary)]"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="mt-4 w-full py-2 cursor-pointer rounded-lg bg-[var(--primary)] text-black font-semibold hover:bg-opacity-90 transition"
        >
          {loading ? <Loader2 className="animate-spin mx-auto" /> : 'Sign In'}
        </button>
      </motion.form>
       {/* <button
          onClick={() => router.push('/pages/home')}
          disabled={loading}
          className=" w-full py-2 rounded-lg bg-black border  border-[var(--primary)] text-primary font-semibold hover:bg-opacity-90 transition"
        >
          Home Page
        </button> */}
    </motion.section>
  );
}
