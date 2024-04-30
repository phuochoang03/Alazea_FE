export const formatPrice = (value) => {
  return value.toLocaleString('it-IT', {style : 'currency', currency : 'VND'});
}