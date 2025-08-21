# Code Citations

## License: unknown
https://github.com/jln13x/ecom/tree/f2474fdda76bc15abc2278b62284bdc199ff64b4/src/features/common/hooks/use-window-scroll.ts

```
= useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }
```

