"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ds_theming_types_1 = require("@bookingcom/ds-theming-types");
const ds_theming_client_1 = require("@bookingcom/ds-theming-client");
const ds_asset_service_client_1 = require("@bookingcom/ds-asset-service-client");
const theming_transform_1 = require("@bookingcom/theming-transform");
const theming_1 = require("../constants/theming");
const gitlabPrivateToken = process.env.API_TOKEN;
const gitlabUser = process.env.API_USER;
const assetServiceClient = new ds_asset_service_client_1.AssetServiceClient(theming_transform_1.designAPIUrl, gitlabUser, gitlabPrivateToken);
const themingClient = new ds_theming_client_1.ThemingClient(theming_transform_1.designAPIUrl);
const getTheme = async (themeId) => {
    /**
     * Get theme defiinition
     */
    const themesList = await themingClient.getThemesList();
    const themeQuery = [...themesList.core, ...themesList.derived]
        .filter((theme) => theme.id === themeId)
        .pop();
    if (!themeQuery)
        throw new Error(`Theme with id ${themeId} not found`);
    const renderedTheme = await themingClient.loadRenderedTheme({
        ...themeQuery,
        color_format: ds_theming_types_1.JSONContextTypes.ColorFormat.RGB,
    });
    /**
     * Extract font assets dependencies
     */
    const assetServiceQuery = {
        capabilities: (0, theming_transform_1.getAssetServiceCapabilities)([renderedTheme]),
        platform: ds_theming_types_1.A.PlatformEnum.web,
    };
    const assets = await assetServiceClient.loadAssets(assetServiceQuery);
    const fontSet = {};
    Object.values(assets.manifests)
        .filter((manifest) => !!manifest.fonts)
        .forEach((manifest) => {
        if (!manifest.fonts)
            return;
        Object.values(manifest.fonts.assets).forEach((groupRecord) => {
            Object.entries(groupRecord).forEach(([alias, manifestEntry]) => {
                const set = manifestEntry.set || manifest.fonts?.set;
                const mapping = manifestEntry.mapping;
                if (!set || !mapping)
                    return;
                fontSet[alias] = { set, mapping };
            });
        });
    });
    /**
     * Resolve font design tokens in the theme using the assets
     */
    const outputTheme = {
        ...renderedTheme.json,
        viewports: {
            small: "max-width: 575px",
            medium: "min-width: 576px",
            large: "min-width: 1024px",
            xlarge: "min-width: 1280px",
        },
    };
    const functionalFonts = outputTheme.fonts.functional;
    const usedFontAssets = new Map();
    Object.keys(functionalFonts).forEach((fontName) => {
        const responsiveFont = functionalFonts[fontName];
        Object.keys(responsiveFont).forEach((viewportName) => {
            const fontToken = responsiveFont[viewportName];
            const fontMappingLink = fontSet[fontToken.assetAlias];
            const mappedFonts = assets.mappings.fonts;
            const fontCascadeAsset = mappedFonts[fontMappingLink.set][fontMappingLink.mapping];
            const fontCascadeWeight = theming_1.fontWeightMap[fontCascadeAsset.fontWeight];
            functionalFonts[fontName][viewportName].weight = fontCascadeWeight;
            const fontCascade = fontCascadeAsset.platformCascadeList?.[theming_1.platformName];
            const defaultFamily = "BlinkMacSystemFont, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif";
            const fontCascadeNames = [];
            if (fontCascade) {
                fontCascade.forEach((cascadeMappingLink) => {
                    const set = cascadeMappingLink.set || fontMappingLink.set;
                    const fontAsset = mappedFonts[set][cascadeMappingLink.mapping];
                    const needsFontFile = fontAsset?.platformIsPreinstalled?.[theming_1.platformName] === false;
                    const cssFontName = fontAsset?.platformFontName?.[theming_1.platformName] ||
                        cascadeMappingLink.mapping;
                    if (set !== "fonts-system" && needsFontFile) {
                        usedFontAssets.set(cascadeMappingLink.mapping, {
                            fileName: cascadeMappingLink.mapping,
                            fontName: cssFontName,
                            weight: fontCascadeWeight,
                        });
                    }
                    const cascadeName = fontAsset?.platformFontName?.[theming_1.platformName]
                        ? `"${cssFontName}"`
                        : defaultFamily;
                    fontCascadeNames.push(cascadeName);
                });
            }
            else {
                fontCascadeNames.push(defaultFamily);
            }
            if (fontCascadeNames.length) {
                functionalFonts[fontName][viewportName].fontFamily =
                    fontCascadeNames.join(", ");
            }
        });
    });
    return {
        theme: outputTheme,
        fontFaces: [...usedFontAssets.values()],
    };
};
exports.default = getTheme;
