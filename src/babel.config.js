export const presets = [
    [
        '@babel/preset-env',
        {
            targets: {
                node: 'current',
            },
            modules: 'auto',
        },
    ],
    '@babel/preset-react',
    '@babel/preset-modules', // Agrega esta línea
];
  