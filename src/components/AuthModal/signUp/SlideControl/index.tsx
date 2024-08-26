import { useEffect } from 'react';
import { Icon } from '@dedo_ai/gui-com-lib';
import { useSwiper } from 'swiper/react';

import { SLIDES_COUNT } from '..';

interface ISlideControlProps {
  activeSlide: number;
}
export const SlideControl = ({
  activeSlide,
}: ISlideControlProps) => {
  const swiper = useSwiper();

  useEffect(() => {
    const interval = setInterval(() => { swiper.slideNext(); }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="controls">
      {
        Array.from(Array(SLIDES_COUNT))
          .map((_, index) => (
            <Icon
              key={`slide-${index}`}
              iconName="PiStarFourFill"
              iconColor={`rgba(var(--color-${activeSlide === index + 1 ? 'accent' : 'neutral-brighter'}), 1)`}
              iconSize={activeSlide === index + 1 ? '2rem' : '1rem'}
            />
          ))
      }
      <div className="next-slide" onClick={() => swiper.slideNext()}>
        <Icon
          iconName="PiArrowRight"
          iconSize="2rem"
        />
      </div>
    </div>
  );
};

export default SlideControl;
