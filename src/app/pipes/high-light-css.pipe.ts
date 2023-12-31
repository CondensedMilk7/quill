import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlightCss'
})
export class HighlightCssPipe implements PipeTransform {

  transform(css: string): string {
    //? List Has to be Updated EveryTime New Keyword is Added
    const keywords = [
      'fontFamily',
      'fontSize',
      'fontStyle',
      'textAlign',
      'textDecoration',
      'lineHeight',
      'letterSpacing',
      'color',
      'backgroundColor',
      'border',
      'margin',
      'padding',
      'borderRadius',
      'maxWidth',
      'style',
      'radius',
      'top',
      'right',
      'bottom',
      'left',
    ];

    const values = css.match(/:.*?;/g)?.map(s => s.slice(1, -1).trim()) || [];
    const selectors = css.match(/.*?{/g)?.map(s => s.slice(0, -1).trim()) || [];

    keywords.forEach(keyword => {
      const regex = new RegExp(`\\b${keyword}\\b`, 'g');
      css = css.replace(regex, `<span class="keyword">${keyword}</span>`);
    });
    values.forEach(value => {
      const regex = new RegExp(`\\b${value}\\b`, 'g');
      css = css.replace(regex, `<span class="value">${value}</span>`);
    });
    selectors.forEach(selector => {
      const regex = new RegExp(`\\b${selector}\\b`, 'g');
      css = css.replace(regex, `<span class="selector">${selector}</span>`);
    });

    return css;
  }
}
