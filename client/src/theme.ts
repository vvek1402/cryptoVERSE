import { MantineThemeOverride } from "@mantine/core";

const theme: MantineThemeOverride = {
  components: {
    Modal: {
      defaultProps: {
        centered: true,
        radius: "lg",
      },
      styles: {
        title: { fontWeight: 600, fontSize: "20px" },
        body: { padding: "24px" },
      },
    },
    Button: {
        defaultProps: {
          radius: "md",
          size: "md",
          border : "none"
        },
        styles: () => ({
          root: {
            fontWeight: 500,
            padding: "12px",
            "&:disabled": {
              backgroundColor: "#d1d1d1",
              color: "#808080",
            },
          },
        }),
      },
    NumberInput: {
      styles: {
        input: {
          height: "48px",
          fontSize: "16px",
          padding: "12px",
        },
      },
    },
    Input : {
        styles: {
            input: {
              height: "48px",
              fontSize: "16px",
              padding: "12px",
            },
          },
    }
  },
};

export default theme;
