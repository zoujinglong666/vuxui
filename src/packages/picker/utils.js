export const clamp = (num, min, max) => {
    return Math.min(Math.max(num, min), max);
}
export const isTwoArray = (arr) => {
    return arr.some(items => {
        return Array.isArray(items);
    });
}
export const AREA_EMPTY_CODE = '000000';
const makeOption = (
    text,
    value,
    children,
) => ({
    text,
    value,
    children,
});

export function formatDataForCascade(
    areaList,
    columnsNum,
    placeholder
) {
    const {
        city_list: city = {},
        county_list: county = {},
        province_list: province = {},
    } = areaList;
    const showCity = +columnsNum > 1;
    const showCounty = +columnsNum > 2;

    const getProvinceChildren = () => {
        if (showCity) {
            return placeholder.length
                ? [
                    makeOption(
                        placeholder[0],
                        AREA_EMPTY_CODE,
                        showCounty ? [] : undefined,
                    ),
                ]
                : [];
        }
    };

    const provinceMap = new Map();
    Object.keys(province).forEach((code) => {
        provinceMap.set(
            code.slice(0, 2),
            makeOption(province[code], code, getProvinceChildren()),
        );
    });

    const cityMap = new Map();
    if (showCity) {
        const getCityChildren = () => {
            if (showCounty) {
                return placeholder.length ? [makeOption(placeholder[1])] : [];
            }
        };

        Object.keys(city).forEach((code) => {
            const option = makeOption(city[code], code, getCityChildren());
            cityMap.set(code.slice(0, 4), option);

            const province = provinceMap.get(code.slice(0, 2));
            if (province && province.children) {
                province.children.push(option);
            }
        });
    }

    if (showCounty) {
        Object.keys(county).forEach((code) => {
            const city = cityMap.get(code.slice(0, 4));
            if (city) {
                if (city.children) {
                    city.children.push(makeOption(county[code], code));

                }
            }
        });
    }

    const options = Array.from(provinceMap.values());

    if (placeholder.length) {
        const county = showCounty ? [makeOption(placeholder[2])] : undefined;
        const city = showCity
            ? [makeOption(placeholder[1], AREA_EMPTY_CODE, county)]
            : undefined;
        options.unshift(makeOption(placeholder[0], AREA_EMPTY_CODE, city));
    }

    return options;
}
