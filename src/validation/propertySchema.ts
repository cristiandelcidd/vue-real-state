export const validationSchema = {
  title(value: string) {
    return value?.length >= 6 ? true : 'The title of the property is mandatory or very short'
  },
  price(value: string) {
    return /^[0-9]+$/.test(value) ? true : 'Price should only be numbers'
  },
  rooms(value: number) {
    return value ? true : 'Select an amount'
  },
  wc(value: number) {
    return value ? true : 'Select an amount'
  },
  parkingLot(value: string) {
    return value ? true : 'Select an amount'
  },
  description(value: string) {
    return value ? true : 'Add a description'
  }
}

export const imageSchema = {
  image(value: File[]) {
    return value ? true : 'Image is required'
  }
}
