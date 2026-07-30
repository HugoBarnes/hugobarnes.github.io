export function ScrollDownArrow() {
  return (
    <a
      href="#about"
      aria-label="Scroll down"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#a0a0a0] hover:text-[#ff6719] transition-colors"
    >
      <span className="block animate-bounce text-2xl leading-none">
        &#x2193;
      </span>
    </a>
  );
}

export default ScrollDownArrow;
