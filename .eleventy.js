import { readdirSync, readFileSync } from 'fs';
import { join, extname, basename } from 'path';
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
// import references from 'src/_data/references.json' assert { type: 'json' };

import markdownit from "markdown-it";

export default function(eleventyConfig) {
    eleventyConfig.setTemplateFormats(['njk', 'md', 'html']);
	eleventyConfig.setLayoutResolution(false);
    eleventyConfig.addPassthroughCopy("src/css/*");
    eleventyConfig.addPassthroughCopy("src/scripts/*");
    eleventyConfig.addPassthroughCopy("src/assets/*.png");
    eleventyConfig.addPassthroughCopy("src/assets/*.svg");
    eleventyConfig.addWatchTarget("src/css/");
    eleventyConfig.addWatchTarget("src/scripts/");
    eleventyConfig.addWatchTarget("src/assets/");
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);


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

    const referencesPath = join('src', '_data', 'references.json');
    const references = JSON.parse(readFileSync(referencesPath, 'utf8'));
    // Create collection of references
    eleventyConfig.addCollection('references', () => references);

    eleventyConfig.addShortcode('cite', (refId) => {
        const index = references.findIndex((ref) => ref.id === refId);
        if (index !== -1) {
          return `<a href="/references/#${refId}">[${index + 1}]</a>`;
        } else {
          console.warn(`Reference with ID "${refId}" not found.`);
          return `[?]`;
        }
      });


      const md = markdownit()

        eleventyConfig.addFilter("markdownify", (str) => {
            return md.render(str);
        });
    

    return {
        dir: {
            input: "src",
            includes: "_includes",
            data: "_data",
            output: "docs"
        },
        pathPrefix: "/livinglab-docs",
    };
}