import { readdirSync, readFileSync } from 'fs';
import { join, extname, basename } from 'path';

export default function(eleventyConfig) {
	eleventyConfig.setLayoutResolution(false);
    eleventyConfig.addPassthroughCopy("src/css/*");
    eleventyConfig.addPassthroughCopy("src/scripts/*");
    eleventyConfig.addPassthroughCopy("src/assets/*.png");
    eleventyConfig.addPassthroughCopy("src/assets/*.svg");
    eleventyConfig.addWatchTarget("src/css/");
    eleventyConfig.addWatchTarget("src/scripts/");
    eleventyConfig.addWatchTarget("src/assets/");

    // Create collection of views
    eleventyConfig.addCollection('views', () => {
        const dir = 'src/views';
    
        // Read all JSON files from the views folder
        return readdirSync(dir)
            .filter((file) => extname(file) === '.json')
            .map((file) => {
                const data = JSON.parse(readFileSync(join(dir, file)));
                data.fileName = basename(file, '.json');
                return data;
            });
    });

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "_site"
        }
    };
}