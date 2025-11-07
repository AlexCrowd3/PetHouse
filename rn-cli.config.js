module.exports = {
    transformer: {
        getTransformOptions: async () => ({
            transform: {
                experimentalImportSupport: false,
                inlineRequires: true,
            },
        }),
    },
    resolver: {
        sourceExts: ['js', 'jsx', 'ts', 'tsx', 'json', 'svg', 'd.ts'],
    },
};