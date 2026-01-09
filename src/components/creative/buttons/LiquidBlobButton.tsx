'use client'

import { motion } from 'framer-motion'

export function LiquidBlobButton({ text = 'Liquid' }: { text?: string }) {
    return (
        <div className="relative group cursor-pointer inline-block">
            <div className="absolute inset-0 bg-pink-600 rounded-full blur-xl opacity-70 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative px-8 py-3 bg-gradient-to-r from-pink-500 to-purple-600 rounded-full text-white font-bold shadow-lg overflow-hidden z-10"
            >
                <span className="relative z-10">{text}</span>
                {/* Blobs */}
                <div className="absolute top-0 left-0 w-full h-full">
                    <div className="absolute -top-[50px] -left-[10px] w-[50px] h-[50px] bg-white opacity-20 rounded-[40%] animate-blob" />
                    <div className="absolute top-[20px] left-[50%] w-[40px] h-[40px] bg-purple-300 opacity-20 rounded-[35%] animate-blob animation-delay-2000" />
                </div>
            </motion.button>
            <style jsx>{`
                @keyframes blob {
                    0% { transform: translate(0, 0) scale(1); }
                    33% { transform: translate(30px, -50px) scale(1.1); }
                    66% { transform: translate(-20px, 20px) scale(0.9); }
                    100% { transform: translate(0, 0) scale(1); }
                }
                .animate-blob {
                    animation: blob 7s infinite;
                }
                .animation-delay-2000 {
                    animation-delay: 2s;
                }
            `}</style>
        </div>
    )
}
