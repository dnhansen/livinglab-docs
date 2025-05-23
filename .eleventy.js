import { readdirSync, readFileSync } from 'fs';
import { join, extname, basename } from 'path';
import { EleventyHtmlBasePlugin } from "@11ty/eleventy";
import { EleventyRenderPlugin } from "@11ty/eleventy";

import markdownit from "markdown-it";

export default function(eleventyConfig) {
    eleventyConfig.setTemplateFormats(['njk', 'md', 'html']);
	eleventyConfig.setLayoutResolution(false);
    eleventyConfig.addPassthroughCopy("src/css/*");
    eleventyConfig.addPassthroughCopy("src/scripts/*");
    eleventyConfig.addPassthroughCopy("src/assets/*.png");
    eleventyConfig.addPassthroughCopy("src/assets/*.svg");
    eleventyConfig.addPassthroughCopy("src/fonts/*");
    eleventyConfig.addWatchTarget("src/css/");
    eleventyConfig.addWatchTarget("src/scripts/");
    eleventyConfig.addWatchTarget("src/assets/");
    eleventyConfig.addWatchTarget("src/fonts/");
    eleventyConfig.addPlugin(EleventyHtmlBasePlugin);
    eleventyConfig.addPlugin(EleventyRenderPlugin);


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
    references.sort((a,b) => a.year - b.year).sort((a,b) => a.author.localeCompare(b.author));
    // Create collection of references
    eleventyConfig.addCollection('references', () => references);

    const glossaryPath = join('src', '_data', 'glossary.json');
    const glossary = JSON.parse(readFileSync(glossaryPath, 'utf8'));
    glossary.sort((a,b) => a.term.localeCompare(b.term));
    // Create collection of references
    eleventyConfig.addCollection('glossary', () => glossary);

    eleventyConfig.addShortcode('cite', (refId) => {
        const index = references.findIndex((ref) => ref.id === refId);
        if (index !== -1) {
          return `<a href="/references/#${refId}">[${index + 1}]</a>`;
        } else {
          console.warn(`Reference with ID "${refId}" not found.`);
          return `[?]`;
        }
      });


      const md = markdownit();

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