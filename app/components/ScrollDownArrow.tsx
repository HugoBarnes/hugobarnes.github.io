export function ScrollDownArrow() {
  return (
    <a
      href="#about"
      aria-label="Scroll down"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#8e99ac] hover:text-[#1a3e8c] transition-colors"
    >
      <span className="block animate-bounce text-2xl leading-none">
        &#x2193;
      </span>
    </a>
  );
}

export default ScrollDownArrow;
