import { ChangeEvent } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { QROptions, DotType, ColorType, GradientType, INITIAL_QR_OPTIONS } from '@/src/types';
import { Trash2, Download } from 'lucide-react';

interface QRConfigProps {
  options: QROptions;
  setOptions: (options: QROptions) => void;
}

export function QRConfig({ options, setOptions }: QRConfigProps) {
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setOptions({
      ...options,
      [name]: type === 'number' ? Number(value) : value,
    });
  };

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setOptions({
          ...options,
          image: event.target?.result as string,
          imageName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setOptions(INITIAL_QR_OPTIONS);
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(options, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "qr-code-config.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="w-full bg-white rounded-xl border border-blue-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden transition-all hover:shadow-[0_8px_30px_rgb(59,130,246,0.08)]">
      <div className="p-2.5 sm:p-4 border-b border-blue-50 flex items-center justify-between bg-gradient-to-r from-blue-50/50 to-white">
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-4 bg-blue-600 rounded-full" />
          <h2 className="text-xs sm:text-sm font-black text-blue-900 tracking-tight uppercase">Painel de Estilo</h2>
        </div>
        <Button variant="ghost" size="sm" onClick={handleClear} className="text-red-500 hover:text-red-600 hover:bg-red-50 h-7 px-2 text-[10px] font-bold">
          <Trash2 className="w-3 h-3 mr-1" />
          LIMPAR
        </Button>
      </div>

      <Accordion type="single" collapsible className="w-full">
        {/* Menu 1: Opções principais */}
        <AccordionItem value="main" className="px-3 sm:px-4 border-b border-blue-50/50">
          <AccordionTrigger className="hover:no-underline py-3 font-bold text-gray-800 text-[11px] sm:text-xs hover:text-blue-600 text-left transition-colors">
            OPÇÕES PRINCIPAIS
          </AccordionTrigger>
          <AccordionContent className="pb-4 space-y-3">
            <div className="space-y-1.5">
              <Label htmlFor="data" className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Dados do QR</Label>
              <Input
                id="data"
                name="data"
                value={options.data}
                onChange={handleInputChange}
                placeholder="Link ou texto..."
                className="h-8 text-[11px] focus-visible:ring-blue-500 px-3 bg-blue-50/20 border-blue-200 hover:border-blue-300 transition-colors"
              />
            </div>

            <div className="space-y-1.5">
              <Label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Logo Personalizada</Label>
              <div className="relative">
                <input
                  id="image"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Button 
                  asChild
                  variant="outline" 
                  className="w-full h-8 text-[10px] border-dashed border-blue-200 bg-blue-50/20 hover:bg-blue-50 hover:border-blue-400 text-blue-700 font-bold transition-all"
                >
                  <label htmlFor="image" className="cursor-pointer flex items-center justify-center gap-2">
                    <Download className="w-3 h-3 rotate-180" />
                    Adicione uma imagem
                  </label>
                </Button>
                {options.imageName && (
                  <p className="mt-1 text-[9px] text-blue-500 font-medium truncate px-1">
                    ✓ {options.imageName}
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="space-y-1.5">
                <Label htmlFor="width" className="text-[9px] font-bold text-gray-400 uppercase">Largura</Label>
                <Input
                  id="width"
                  name="width"
                  type="number"
                  value={options.width}
                  onChange={handleInputChange}
                  className="h-8 text-[11px] px-2 bg-blue-50/20 border-blue-200 hover:border-blue-300 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="height" className="text-[9px] font-bold text-gray-400 uppercase">Altura</Label>
                <Input
                  id="height"
                  name="height"
                  type="number"
                  value={options.height}
                  onChange={handleInputChange}
                  className="h-8 text-[11px] px-2 bg-blue-50/20 border-blue-200 hover:border-blue-300 transition-colors"
                />
              </div>
              <div className="space-y-1.5">
                <Label htmlFor="margin" className="text-[9px] font-bold text-gray-400 uppercase">Margem</Label>
                <Input
                  id="margin"
                  name="margin"
                  type="number"
                  value={options.margin}
                  onChange={handleInputChange}
                  className="h-8 text-[11px] px-2 bg-blue-50/20 border-blue-200 hover:border-blue-300 transition-colors"
                />
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Menu 2: Opções de pontos */}
        <AccordionItem value="dots" className="px-3 sm:px-4 border-b border-blue-50/50">
          <AccordionTrigger className="hover:no-underline py-3 font-bold text-gray-800 text-[11px] sm:text-xs hover:text-blue-600 text-left transition-colors">
            OPÇÕES DE PONTOS
          </AccordionTrigger>
          <AccordionContent className="pb-4 space-y-3">
            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-gray-400 uppercase">Estilo</Label>
                <Select
                  value={options.dotsOptions.type}
                  onValueChange={(val: DotType) => setOptions({
                    ...options,
                    dotsOptions: { ...options.dotsOptions, type: val }
                  })}
                >
                  <SelectTrigger className="h-8 text-[11px] px-2 bg-blue-50/20 border-2 border-blue-200 hover:border-blue-400 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="square">Quadrado</SelectItem>
                    <SelectItem value="dots">Pontos</SelectItem>
                    <SelectItem value="rounded">Arredondado</SelectItem>
                    <SelectItem value="extra-rounded">Extra Arred.</SelectItem>
                    <SelectItem value="classy">Elegante</SelectItem>
                    <SelectItem value="classy-rounded">Eleg. Arred.</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-[10px] font-bold text-gray-400 uppercase">Tipo Cor</Label>
                <Select
                  value={options.dotsOptions.colorType}
                  onValueChange={(val: ColorType) => setOptions({
                    ...options,
                    dotsOptions: { ...options.dotsOptions, colorType: val }
                  })}
                >
                  <SelectTrigger className="h-8 text-[11px] px-2 bg-blue-50/20 border-2 border-blue-200 hover:border-blue-400 transition-colors">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="single">Única</SelectItem>
                    <SelectItem value="gradient">Gradiente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="p-2.5 bg-blue-50/30 rounded-lg border border-blue-100/50">
              <Label className="text-[10px] font-bold text-blue-900/40 uppercase mb-2 block">Paleta de Cores</Label>
              <div className="flex gap-3">
                <div className="flex-1 space-y-1">
                  <Input
                    type="color"
                    value={options.dotsOptions.color1}
                    onChange={(e) => setOptions({
                      ...options,
                      dotsOptions: { ...options.dotsOptions, color1: e.target.value }
                    })}
                    className="h-10 cursor-pointer p-1 rounded-md border-2 border-blue-200 bg-blue-50/20 hover:border-blue-400 transition-colors"
                  />
                  <span className="text-[8px] text-center block font-bold text-gray-400">COR 1</span>
                </div>
                {options.dotsOptions.colorType === 'gradient' && (
                  <div className="flex-1 space-y-1">
                    <Input
                      type="color"
                      value={options.dotsOptions.color2}
                      onChange={(e) => setOptions({
                        ...options,
                        dotsOptions: { ...options.dotsOptions, color2: e.target.value }
                      })}
                      className="h-10 cursor-pointer p-1 rounded-md border-2 border-blue-200 bg-blue-50/20 hover:border-blue-400 transition-colors"
                    />
                    <span className="text-[8px] text-center block font-bold text-gray-400">COR 2</span>
                  </div>
                )}
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Menu 3: Opções de cantos */}
        <AccordionItem value="corners" className="px-3 sm:px-4 border-b border-blue-50/50">
          <AccordionTrigger className="hover:no-underline py-3 font-bold text-gray-800 text-[11px] sm:text-xs hover:text-blue-600 text-left transition-colors">
            OPÇÕES DE CANTOS
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex items-center gap-3 p-2.5 bg-blue-50/30 rounded-lg border border-blue-100/50">
              <Input
                type="color"
                value={options.cornersSquareOptions.color}
                onChange={(e) => setOptions({
                  ...options,
                  cornersSquareOptions: { ...options.cornersSquareOptions, color: e.target.value }
                })}
                className="h-10 w-16 cursor-pointer p-1 rounded-md border-2 border-blue-200 bg-blue-50/20 hover:border-blue-400 transition-colors"
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-700">Cor dos Cantos</span>
                <span className="text-[8px] text-gray-400 uppercase font-medium">{options.cornersSquareOptions.color}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Menu 4: Opções de fundo */}
        <AccordionItem value="background" className="px-3 sm:px-4 border-b border-blue-50/50">
          <AccordionTrigger className="hover:no-underline py-3 font-bold text-gray-800 text-[11px] sm:text-xs hover:text-blue-600 text-left transition-colors">
            OPÇÕES DE FUNDO
          </AccordionTrigger>
          <AccordionContent className="pb-4">
            <div className="flex items-center gap-3 p-2.5 bg-blue-50/30 rounded-lg border border-blue-100/50">
              <Input
                type="color"
                value={options.backgroundOptions.color}
                onChange={(e) => setOptions({
                  ...options,
                  backgroundOptions: { ...options.backgroundOptions, color: e.target.value }
                })}
                className="h-10 w-16 cursor-pointer p-1 rounded-md border-2 border-blue-200 bg-blue-50/20 hover:border-blue-400 transition-colors"
              />
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-700">Cor de Fundo</span>
                <span className="text-[8px] text-gray-400 uppercase font-medium">{options.backgroundOptions.color}</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <div className="p-3 sm:p-4 bg-gradient-to-b from-white to-blue-50/50">
        <Button
          onClick={handleExportJSON}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 rounded-lg transition-all text-[11px] uppercase tracking-widest shadow-[0_4px_14px_0_rgba(59,130,246,0.39)]"
        >
          <Download className="w-3.5 h-3.5 mr-2" />
          Exportar JSON
        </Button>
      </div>
    </div>
  );
}
