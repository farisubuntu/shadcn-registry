# ActionButton

## Key Features

- Generic type support for action responses
- Loading state management
- Error handling
- Success callbacks
- Loading indicator with customizable text
- Inherits all shadcn/ui Button props
- Type-safe server action handling

<!-- TODO:-->

Enable server action simualtion:

```tsx

const simulateServerActionWithTime = async (t = 1) => {
  await new Promise(resolve => setTimeout(resolve, (t * 1000)))

  return {
    data: { message: 'Action completed successfully...' }
  };
}
```
