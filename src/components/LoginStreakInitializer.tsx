import React from "react";
import { useLoginStreak } from "../hooks/useLoginStreak";

interface LoginStreakInitializerProps {
  children: React.ReactNode;
}

const LoginStreakInitializer: React.FC<LoginStreakInitializerProps> = ({
  children,
}) => {
  useLoginStreak();

  return <>{children}</>;
};

export default LoginStreakInitializer;
