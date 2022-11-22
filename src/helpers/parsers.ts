export const jsonParse =
  <T>(typeguard: (o: any) => o is T) =>
  (text: string): T => {
    const parsed = JSON.parse(text);
    if (typeguard(parsed)) {
      return parsed;
    }
    throw new Error('Parsing Error');
  };
