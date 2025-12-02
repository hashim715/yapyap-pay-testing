import { useNavigate, useLocation } from "react-router-dom";
import { useSwipeable, SwipeableHandlers } from "react-swipeable";

const NAV_ROUTES = ["/", "/home", "/earnings", "/profile"];

interface ExtendedSwipeableHandlers extends SwipeableHandlers {
  onSwiping?: (eventData: any) => void;
}

export const useSwipeNavigation = (): ExtendedSwipeableHandlers => {
  const navigate = useNavigate();
  const location = useLocation();

  const handlers = useSwipeable({
    onSwipedLeft: () => {
      const currentIndex = NAV_ROUTES.indexOf(location.pathname);
      if (currentIndex !== -1 && currentIndex < NAV_ROUTES.length - 1) {
        navigate(NAV_ROUTES[currentIndex + 1]);
      }
    },
    onSwipedRight: () => {
      const currentIndex = NAV_ROUTES.indexOf(location.pathname);
      if (currentIndex > 0) {
        navigate(NAV_ROUTES[currentIndex - 1]);
      }
    },
    trackMouse: false, // Only track touch, not mouse
    delta: 80, // Minimum swipe distance
    preventScrollOnSwipe: false,
    touchEventOptions: { passive: true },
  });

  return handlers as ExtendedSwipeableHandlers;
};
