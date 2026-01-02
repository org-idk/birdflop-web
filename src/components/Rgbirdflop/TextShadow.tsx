import { component$, useContext } from '@builder.io/qwik';
import { rgbStoreContext } from '~/routes/resources/rgb';
import ColorMap from './ColorMap';
import ColorList from './ColorList';
import { Toggle, NumberInput } from '@luminescent/ui-qwik';
import { inlineTranslate } from 'qwik-speak';

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
    }} id="decode">
      {rgbStore.format.color != 'JSON' && rgbStore.format.color != 'MiniMessage' &&
        <p class="text-red-500!">
          {t('rgb.colors.shadow.warning@@Warning: Text shadow only works with JSON or MiniMessage formatting!')}
        </p>
      }
      <Toggle id="syncshadow" checked={rgbStore.syncshadow}
        onChange$={(e, el) => {
          rgbStore.syncshadow = el.checked;
        }}
      >
        {t('rgb.colors.shadow.sync@@Sync with text colors')}
      </Toggle>
      <Toggle id="enableshadow" checked={rgbStore.enableshadow}
        onChange$={(e, el) => {
          rgbStore.enableshadow = el.checked;
        }}
      >
        {t('rgb.colors.shadow.enable@@Enable text shadow')}
      </Toggle>
      <div class={{
        'transition-all duration-300': true,
        'opacity-50': rgbStore.syncshadow,
      }}>
        <div class="flex gap-2 py-2 px-4">
          <NumberInput input id="shadowopacity"
            min={0} max={1} step={0.1}
            value={rgbStore.shadowopacity}
            class={{ 'w-full': true }}
            onChange$={(e, el) => {
              rgbStore.shadowopacity = parseFloat(el.value);
            }}
            disabled={rgbStore.syncshadow}
          >
            {t('rgb.colors.shadow.opacity@@Opacity')}
          </NumberInput>
          <NumberInput input id="shadowbrightness"
            min={0} max={1} step={0.1}
            value={rgbStore.shadowbrightness}
            class={{ 'w-full': true }}
            onChange$={(e, el) => {
              rgbStore.shadowbrightness = parseFloat(el.value);
            }}
          >
            {t('rgb.colors.shadow.brightness@@Brightness')}
          </NumberInput>
        </div>
        <div class="py-2 px-4">
          <ColorMap id="shadow" />
        </div>
        <ColorList id="shadow" hidden={hidden} />
      </div>
    </div>
  );
});