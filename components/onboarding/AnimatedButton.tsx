"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Button, type ButtonProps } from "@/components/ui/button";

interface AnimatedButtonProps extends ButtonProps {
  children: React.ReactNode;
}

export function AnimatedButton({
  children,
  className,
  ...props
}: AnimatedButtonProps) {
  return (
    <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
      <Button className={cn("w-full md:w-auto", className)} {...props}>
        {children}
      </Button>
    </motion.div>
  );
}
