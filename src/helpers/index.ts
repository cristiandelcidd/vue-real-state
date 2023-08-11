export const propertyPrice = (price: string) =>
  Number(price).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD'
  })
