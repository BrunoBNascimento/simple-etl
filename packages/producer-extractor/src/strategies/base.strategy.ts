export default interface BaseStrategy {
  fetch(): void;
  process(): void;
  send(): void;
  execute(t: string): void;
}
