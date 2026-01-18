import { component$, useContext, $ } from '@builder.io/qwik';
import { rgbStoreContext } from '~/routes/resources/rgb';
import ColorMap from './ColorMap';
import ColorList from './ColorList';
import { Toggle, NumberInput } from '@luminescent/ui-qwik';
import { inlineTranslate } from 'qwik-speak';
import { RefreshCw } from 'lucide-icons-qwik';

export default component$(({ hidden }: {
  hidden: boolean;
}) => {
  const t = inlineTranslate();
  const rgbStore = useContext(rgbStoreContext);

  return (
    <div class={{
      'flex flex-col gap-2 transition-all duration-300': true,
      'h-0 opacity-0 pointer-events-none': hidden,
      'opacity-100 pointer-events-auto': !hidden,
    }} id="textshadow">
      {rgbStore.format.color != 'JSON' && rgbStore.format.color != 'MiniMessage' &&
        <p class="text-red-500!">
          {t('rgb.colors.shadow.warning@@Warning: Text shadow only works with JSON or MiniMessage formatting!')}
        </p>
      }
      <Toggle id="enableshadow" checked={rgbStore.enableshadow}
        onChange$={(e, el) => {
          rgbStore.enableshadow = el.checked;
        }}
      >
        {t('rgb.colors.shadow.enable@@Enable text shadow')}
      </Toggle>
      <Toggle id="syncshadow" checked={rgbStore.syncshadow}
        onChange$={(e, el) => {
          rgbStore.syncshadow = el.checked;
          if (el.checked) {
            rgbStore.shadowopacity = 1.0;
            rgbStore.shadowbrightness = 0.25;
          }
        }}
      >
        {t('rgb.colors.shadow.sync@@Sync with text colors')}
      </Toggle>
      <div class={{
        'transition-all duration-300': true,
      }}>
        <div class="flex flex-row gap-6 py-2 px-3 overflow-hidden">
          <div class="flex flex-col gap-1 w-28 shrink-0">
            <div class="flex items-center gap-2 text-sm font-medium text-white">
              <button
                type="button"
                class="hover:text-blue-400 transition-colors text-white shrink-0"
                title={t('rgb.colors.shadow.reset@@Reset')}
                onClick$={$(() => {
                  rgbStore.shadowopacity = 1.0;
                })}
              >
                <RefreshCw size={14} />
              </button>
              <span class="whitespace-nowrap text-xs">{t('rgb.colors.shadow.opacity@@Opacity')}</span>
              <input
                type="number"
                id="shadowopacity"
                min={0}
                max={1}
                step={0.05}
                value={rgbStore.shadowopacity}
                class="w-10 h-6 bg-lum-input-bg border-none rounded-lg text-center text-white text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                onInput$={$(async (e, el) => {
                  rgbStore.shadowopacity = parseFloat(el.value);
                })}
              />
            </div>
            <div class="flex items-center">
              <input
                type="range"
                min="0"
                max="1"
                step="0.05"
                value={rgbStore.shadowopacity}
                onInput$={$(async (e, el) => {
                  rgbStore.shadowopacity = parseFloat(el.value);
                })}
                class="w-full h-2 bg-lum-input-bg rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>

          <div class="flex flex-col gap-1 w-28 shrink-0">
            <div class="flex items-center gap-2 text-sm font-medium text-white">
              <button
                type="button"
                class="hover:text-blue-400 transition-colors text-white shrink-0"
                title={t('rgb.colors.shadow.reset@@Reset')}
                onClick$={$(() => {
                  rgbStore.shadowbrightness = 0.25;
                })}
              >
                <RefreshCw size={14} />
              </button>
              <span class="whitespace-nowrap text-xs">{t('rgb.colors.shadow.brightness@@Brightness')}</span>
              <input
                type="number"
                id="shadowbrightness"
                min={0}
                max={2}
                step={0.05}
                value={rgbStore.shadowbrightness}
                class="w-10 h-6 bg-lum-input-bg border-none rounded-lg text-center text-white text-xs focus:ring-1 focus:ring-blue-500 outline-none"
                onInput$={$(async (e, el) => {
                  rgbStore.shadowbrightness = parseFloat(el.value);
                })}
              />
            </div>
            <div class="flex items-center">
              <input
                type="range"
                min="0"
                max="2"
                step="0.05"
                value={rgbStore.shadowbrightness}
                onInput$={$(async (e, el) => {
                  rgbStore.shadowbrightness = parseFloat(el.value);
                })}
                class="w-full h-2 bg-lum-input-bg rounded-lg appearance-none cursor-pointer accent-blue-500"
              />
            </div>
          </div>
        </div>
        <div class="py-2 px-4">
          <ColorMap id="shadow" />
        </div>
        <ColorList id="shadow" hidden={hidden} />
      </div>
    </div>
  );
});