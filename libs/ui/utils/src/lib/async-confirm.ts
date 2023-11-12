export function asyncConfirm(message: string): Promise<boolean> {
  return new Promise(resolve => {
    const confirmed = window.confirm(message);
    resolve(confirmed);
  });
}
