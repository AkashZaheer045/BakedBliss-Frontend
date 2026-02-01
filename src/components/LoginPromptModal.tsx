import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LogIn, UserPlus, X } from "lucide-react";

interface LoginPromptModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
  onSignUp: () => void;
  actionType?: 'cart' | 'favorites' | 'general';
}

const actionMessages = {
  cart: {
    title: "Sign in to add to cart",
    description: "Create an account or sign in to save items to your cart and checkout."
  },
  favorites: {
    title: "Sign in to save favorites",
    description: "Create an account or sign in to save your favorite items."
  },
  general: {
    title: "Sign in to continue",
    description: "Create an account or sign in to access all features."
  }
};

export const LoginPromptModal = ({ 
  isOpen, 
  onClose, 
  onLogin, 
  onSignUp, 
  actionType = 'general' 
}: LoginPromptModalProps) => {
  const message = actionMessages[actionType];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {message.title}
          </DialogTitle>
          <DialogDescription className="text-center text-muted-foreground">
            {message.description}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-3 mt-4">
          <Button 
            onClick={onLogin}
            className="w-full gap-2"
            size="lg"
          >
            <LogIn className="w-4 h-4" />
            Sign In
          </Button>
          
          <Button 
            onClick={onSignUp}
            variant="outline"
            className="w-full gap-2"
            size="lg"
          >
            <UserPlus className="w-4 h-4" />
            Create Account
          </Button>

          <Button 
            onClick={onClose}
            variant="ghost"
            className="w-full text-muted-foreground"
          >
            Continue browsing
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
