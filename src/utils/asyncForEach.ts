
export async function asyncForEach<T>(
  array: Array<T>,
  callback: (item: T, index: number) => Promise<any>
) {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index);
  }
}
 




