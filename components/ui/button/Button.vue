<script setup lang="ts">
import type { HTMLAttributes } from 'vue'
import { Primitive, type PrimitiveProps } from 'radix-vue'
import { type ButtonVariants, buttonVariants } from './'
import { cn } from '@/lib/utils'

interface Props extends /* @vue-ignore */ PrimitiveProps {
  variant?: ButtonVariants['variant']
  size?: ButtonVariants['size']
  class?: HTMLAttributes['class']
  as?: string // Ensure 'as' is defined
  asChild?: boolean // Ensure 'asChild' is defined
}

const props = withDefaults(defineProps<Props>(), {
  as: 'button',
  asChild: false, // Provide a default value for 'asChild'
})
</script>

<template>
	<Primitive :as="props.as" :as-child="props.asChild" :class="cn(buttonVariants({ variant: props.variant, size: props.size }), props.class)">
		<slot />
	</Primitive>
</template>
