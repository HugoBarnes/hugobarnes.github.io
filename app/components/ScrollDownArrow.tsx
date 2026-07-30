export function ScrollDownArrow() {
  return (
    <a
      href="#about"
      aria-label="Scroll down"
      className="absolute bottom-8 left-1/2 -translate-x-1/2 text-[#4a3a42] hover:text-[#9aa5cc] transition-colors"
    >
      <span className="block animate-bounce text-2xl leading-none">
        &#x2193;
      </span>
    </a>
  );
}

export default ScrollDownArrow;
