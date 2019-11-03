import * as React from 'react';

export interface ILazyLoad {
  margin?: string;
  threshold?: 0 | 0.25 | 0.5 | 0.75 | 1;
  loading?: string | React.ReactNode;
}

const LazyLoad: React.FC<ILazyLoad> = ({
  margin = '0px',
  threshold = 1,
  loading = 'Loading...',
  children,
}) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [show, setShow] = React.useState(false);

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.intersectionRatio === 1) {
          setShow(true);
        }
      },
      {
        root: null,
        rootMargin: margin,
        threshold: threshold,
      },
    );

    if (ref.current) {
      observer.observe(ref.current);
    }
  }, [show]);

  return <div ref={ref}>{show ? children : loading}</div>;
};

export default LazyLoad;
