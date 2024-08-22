import { Metadata } from 'next'

export function useSeoMeta(props: Metadata): Metadata {
  return {
    ...props,
    title: `${props.title} - SpinGenius`,
  }
}