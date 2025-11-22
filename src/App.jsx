import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Search, Plus, Minus, Package, X, Filter, ChevronRight, Settings, RefreshCw } from 'lucide-react';

// --- 1. 精确颜色数据库 (保持不变) ---
const EXACT_COLORS = {
  // --- Image 1: A, B, C, D ---
  'A01': '#FDFBC8', 'A02': '#FFFACD', 'A03': '#FFF200', 'A04': '#FFD700', 'A05': '#FFC125',
  'A06': '#FFB03B', 'A07': '#FF8C00', 'A08': '#FFC850', 'A09': '#FF7F50', 'A10': '#FF4500',
  'A11': '#FFE5B4', 'A12': '#FF9966', 'A13': '#FFCC33', 'A14': '#D72D34', 'A15': '#FFFFE0',
  'A16': '#FAFAD2', 'A17': '#FCE57E', 'A18': '#FFCC99', 'A19': '#FF6F61', 'A20': '#EEDC82',
  'A21': '#F0E68C', 'A22': '#DFFF00', 'A23': '#E3D5C3', 'A24': '#E7E2B0', 'A25': '#FFDB58',
  'A26': '#DAA520',

  'B01': '#CCFF33', 'B02': '#66FF00', 'B03': '#99FF66', 'B04': '#76EE00', 'B05': '#33CC33',
  'B06': '#66CDAA', 'B07': '#2E8B57', 'B08': '#006400', 'B09': '#2F4F4F', 'B10': '#93CDB9',
  'B11': '#556B2F', 'B12': '#004837', 'B13': '#9ACD32', 'B14': '#7CFC00', 'B15': '#1B4D3E',
  'B16': '#98FB98', 'B17': '#808000', 'B18': '#FFFF66', 'B19': '#20B2AA', 'B20': '#AFEEEE',
  'B21': '#008080', 'B22': '#053436', 'B23': '#162015', 'B24': '#F0E68C', 'B25': '#5F9EA0',
  'B26': '#6B8E23', 'B27': '#E0F3CD', 'B28': '#90EE90', 'B29': '#ADFF2F', 'B30': '#F0FFF0',
  'B31': '#C1F0C1', 'B32': '#8FBC8F',

  'C01': '#E0FFFF', 'C02': '#AFEEEE', 'C03': '#ADD8E6', 'C04': '#87CEEB', 'C05': '#00BFFF',
  'C06': '#1E90FF', 'C07': '#4169E1', 'C08': '#0000FF', 'C09': '#0000CD', 'C10': '#33B0E3',
  'C11': '#00CED1', 'C12': '#191970', 'C13': '#E1F4F9', 'C14': '#B0E0E6', 'C15': '#48D1CC',
  'C16': '#004681', 'C17': '#00BFFF', 'C18': '#1C2A45', 'C19': '#2874A6', 'C20': '#004F98',
  'C21': '#B0C4DE', 'C22': '#5F9EA0', 'C23': '#A5CAD6', 'C24': '#6495ED', 'C25': '#AFEEEE',
  'C26': '#4682B4', 'C27': '#E6E6FA', 'C28': '#D4D9E8', 'C29': '#27367D',

  'D01': '#E6E6FA', 'D02': '#BCA6D8', 'D03': '#4C5AA6', 'D04': '#1C2A5C', 'D05': '#9C4598',
  'D06': '#A674B8', 'D07': '#8767A3', 'D08': '#E6E6FA', 'D09': '#D6CADD', 'D10': '#2E1B3E',
  'D11': '#C6B5D4', 'D12': '#D98CB0', 'D13': '#C71585', 'D14': '#8B008B', 'D15': '#2C1D5E',
  'D16': '#E8E8FF', 'D17': '#DCDCDC', 'D18': '#9966CC', 'D19': '#DDA0DD', 'D20': '#BA55D3',
  'D21': '#800080', 'D22': '#282266', 'D23': '#F3E5F5', 'D24': '#7B68EE', 'D25': '#414EA4',
  'D26': '#E0B0FF',

  'E01': '#FFE4E1', 'E02': '#FFB6C1', 'E03': '#FFC0CB', 'E04': '#FF69B4', 'E05': '#FF1493',
  'E06': '#D74868', 'E07': '#C71585', 'E08': '#FFE4E1', 'E09': '#DA70D6', 'E10': '#C71585',
  'E11': '#FADADD', 'E12': '#FF66CC', 'E13': '#8B0046', 'E14': '#FFDAB9', 'E15': '#FFE4E1',
  'E16': '#FFF0F5', 'E17': '#FFF5EE', 'E18': '#FFB6C1', 'E19': '#FFC1CC', 'E20': '#D8BFD8',
  'E21': '#BC8F8F', 'E22': '#C48EAC', 'E23': '#7B586D', 'E24': '#E6E6FA',

  'F01': '#FFA07A', 'F02': '#FF6347', 'F03': '#FF4500', 'F04': '#FF0000', 'F05': '#DC143C',
  'F06': '#A52A2A', 'F07': '#B22222', 'F08': '#8B0000', 'F09': '#E9967A', 'F10': '#8B4513',
  'F11': '#52181B', 'F12': '#FF5C5C', 'F13': '#FF7F50', 'F14': '#FA8072', 'F15': '#D32F2F',
  'F16': '#FFDAB9', 'F17': '#F4A460', 'F18': '#D2691E', 'F19': '#CD5C5C', 'F20': '#BC8F8F',
  'F21': '#FFC0CB', 'F22': '#FFB6C1', 'F23': '#FF69B4', 'F24': '#FFB7C5', 'F25': '#E75480',

  'G01': '#FFF8DC', 'G02': '#FFE4C4', 'G03': '#FFDEAD', 'G04': '#F5DEB3', 'G05': '#DEB887',
  'G06': '#DAA520', 'G07': '#8B5A2B', 'G08': '#5D4037', 'G09': '#D2B48C', 'G10': '#CD853F',
  'G11': '#BDB76B', 'G12': '#F0E68C', 'G13': '#A0522D', 'G14': '#6D4C41', 'G15': '#F5F5DC',
  'G16': '#FAEBD7', 'G17': '#594139', 'G18': '#FFF0F5', 'G19': '#D2691E', 'G20': '#8B4513',
  'G21': '#8D6E63',

  'H01': '#FFFFFF', 'H02': '#F8F8FF', 'H03': '#D3D3D3', 'H04': '#A9A9A9', 'H05': '#696969',
  'H06': '#1A1A1A', 'H07': '#000000', 'H08': '#F2F2F2', 'H09': '#F5F5F5', 'H10': '#E0E0E0',
  'H11': '#CCCCCC', 'H12': '#FFFFFF', 'H13': '#FFFFF0', 'H14': '#B0C4DE', 'H15': '#778899',
  'H16': '#111111', 'H17': '#F5F5F5', 'H18': '#FFFFFF', 'H19': '#FAFAFA', 'H20': '#9E9E9E',
  'H21': '#FFFFE0', 'H22': '#DCDCDC', 'H23': '#808080',

  'M01': '#C0C0C0', 'M02': '#808080', 'M03': '#708090', 'M04': '#F5F5DC', 'M05': '#BDB76B',
  'M06': '#8B8B00', 'M07': '#BC8F8F', 'M08': '#CD5C5C', 'M09': '#CD853F', 'M10': '#C08081',
  'M11': '#897383', 'M12': '#55474F', 'M13': '#CC9966', 'M14': '#A0522D', 'M15': '#708090',
};


// --- 2. 数据配置 (保持不变) ---
const SERIES_CONFIG = {
  A: { count: 26, label: 'A 黄色系' },
  B: { count: 32, label: 'B 绿色系' },
  C: { count: 29, label: 'C 蓝色系' },
  D: { count: 26, label: 'D 紫色系' },
  E: { count: 24, label: 'E 粉色系' },
  F: { count: 25, label: 'F 红色系' },
  G: { count: 21, label: 'G 棕色系' },
  H: { count: 23, label: 'H 黑白灰' },
  M: { count: 15, label: 'M 金属/灰' },
};

const generateInitialData = () => {
  const data = [];
  Object.entries(SERIES_CONFIG).forEach(([prefix, config]) => {
    for (let i = 1; i <= config.count; i++) {
      const numStr = i.toString().padStart(2, '0');
      const id = `${prefix}${numStr}`;
      const hex = EXACT_COLORS[id] || '#CCCCCC';
      data.push({ id, prefix, name: id, count: 0, hex });
    }
  });
  return data;
};

export default function PerlerBeadApp() {
  // --- State 管理 ---
  const [beads, setBeads] = useState(() => {
    let initialData = [];
    try {
      const saved = localStorage.getItem('perler-bead-inventory-v2');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0 && parsed[0].prefix) {
          initialData = parsed;
        }
      }
    } catch (e) { console.error(e); }

    if (initialData.length === 0) initialData = generateInitialData();

    const validPrefixes = Object.keys(SERIES_CONFIG);
    const syncedData = initialData
      .filter(bead => validPrefixes.includes(bead.prefix))
      .map(bead => ({ ...bead, hex: EXACT_COLORS[bead.id] || bead.hex }));

    const currentIds = new Set(syncedData.map(b => b.id));
    generateInitialData().forEach(item => {
      if (!currentIds.has(item.id)) syncedData.push(item);
    });

    syncedData.sort((a, b) => {
        if (a.prefix !== b.prefix) return a.prefix.localeCompare(b.prefix);
        return a.id.localeCompare(b.id);
    });

    return syncedData;
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBead, setSelectedBead] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  
  const categoryScrollRef = useRef(null);

  useEffect(() => {
    localStorage.setItem('perler-bead-inventory-v2', JSON.stringify(beads));
  }, [beads]);

  const filteredBeads = useMemo(() => {
    let result = beads;
    if (selectedCategory !== 'All') result = result.filter(bead => bead.prefix === selectedCategory);
    if (searchTerm) result = result.filter(bead => bead.id.toLowerCase().includes(searchTerm.toLowerCase()));
    return result;
  }, [beads, selectedCategory, searchTerm]);

  const updateCount = (id, newCount) => {
    const validCount = Math.max(0, newCount);
    setBeads(prev => prev.map(item => item.id === id ? { ...item, count: validCount } : item));
    if (selectedBead && selectedBead.id === id) {
      setSelectedBead(prev => ({ ...prev, count: validCount }));
    }
  };

  const handleAdjust = (amount) => {
    if (!selectedBead) return;
    updateCount(selectedBead.id, selectedBead.count + amount);
  };

  const handleDirectInput = (e) => {
    const val = parseInt(e.target.value) || 0;
    updateCount(selectedBead.id, val);
  };

  const handleCategoryClick = (cat) => {
    setSelectedCategory(cat);
    setSearchTerm('');
  };

  const handleResetData = () => {
    if (window.confirm('确定要重置所有数据吗？')) {
      setBeads(generateInitialData());
      setShowSettings(false);
      alert('数据已重置。');
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50 font-sans text-gray-800 max-w-md mx-auto shadow-2xl overflow-hidden relative">
      
      {/* 顶部区域 */}
      <div className="bg-white px-4 pt-4 pb-2 shadow-sm z-10">
        <div className="flex justify-between items-center mb-3">
          <h1 className="text-lg font-bold flex items-center gap-2 text-gray-800">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white"><Package size={18} /></div>
            拼豆库存
          </h1>
          <div className="flex items-center gap-2">
            <div className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
               总数: <span className="font-bold text-blue-600">{beads.reduce((a, c) => a + c.count, 0)}</span>
            </div>
            <button onClick={() => setShowSettings(true)} className="p-1.5 text-gray-400 hover:bg-gray-100 rounded-full"><Settings size={20} /></button>
          </div>
        </div>
        <div className="relative mb-2">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
          <input 
            type="text" 
            placeholder="搜索色号 (例如: A05)"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-gray-100 text-gray-800 placeholder-gray-400 pl-9 pr-4 py-2 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
          />
          {searchTerm && (
            <button onClick={() => setSearchTerm('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={14} /></button>
          )}
        </div>
      </div>

      {/* 分类导航栏 */}
      <div className="bg-white border-b border-gray-100 py-2 shadow-[0_4px_6px_-1px_rgba(0,0,0,0.02)] z-10">
        <div ref={categoryScrollRef} className="flex overflow-x-auto px-4 gap-2 custom-scrollbar pb-1 select-none">
          <button
            onClick={() => handleCategoryClick('All')}
            className={`shrink-0 whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${selectedCategory === 'All' ? 'bg-gray-800 text-white shadow-md' : 'bg-gray-100 text-gray-600'}`}
          >
            全部
          </button>
          {Object.keys(SERIES_CONFIG).map(prefix => (
            <button
              key={prefix}
              onClick={() => handleCategoryClick(prefix)}
              className={`shrink-0 whitespace-nowrap px-3.5 py-1.5 rounded-full text-sm font-medium transition-all flex items-center gap-1 ${selectedCategory === prefix ? 'bg-blue-600 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600'}`}
            >
              <span className="font-bold">{prefix}</span>
              {selectedCategory === prefix && <span className="text-[10px] opacity-80 ml-1">系列</span>}
            </button>
          ))}
        </div>
      </div>

      {/* 主列表区域 */}
      <div className="flex-1 overflow-y-auto bg-gray-50 p-3 space-y-2 custom-scrollbar">
        {filteredBeads.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-64 text-gray-400">
            <Filter size={48} className="mb-2 opacity-20" />
            <p>该分类下没有找到色号</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-2">
             <div className="flex justify-between items-center px-1 text-xs text-gray-400 mb-1">
               <span>{selectedCategory === 'All' ? '所有色号' : `${SERIES_CONFIG[selectedCategory].label}`}</span>
               <span>{filteredBeads.length} 个结果</span>
             </div>
            {filteredBeads.map((bead) => (
              <div key={bead.id} onClick={() => setSelectedBead(bead)} className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 flex items-center justify-between active:scale-[0.98] transition-transform cursor-pointer group">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full shadow-inner border border-gray-100" style={{ backgroundColor: bead.hex }}></div>
                    <div className="absolute -bottom-1 -right-1 bg-gray-100 text-[10px] font-bold px-1 rounded text-gray-500 border border-white">{bead.prefix}</div>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800 text-lg leading-none">{bead.id}</h3>
                    <p className="text-[10px] text-gray-400 mt-1">库存</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="text-right">
                    <span className={`block text-xl font-bold leading-none ${bead.count === 0 ? 'text-red-400' : 'text-blue-600'}`}>{bead.count}</span>
                    <span className="text-[10px] text-gray-400">颗</span>
                  </div>
                  <ChevronRight size={16} className="text-gray-300 group-hover:text-blue-400 transition-colors" />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* 设置弹窗 (修复 Z-Index) */}
      {showSettings && (
        <div className="absolute inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in">
           <div className="bg-white w-full max-w-xs rounded-2xl p-5 shadow-xl relative z-10">
              <h2 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2"><Settings size={20} /> 设置</h2>
              <div className="space-y-3">
                <button onClick={handleResetData} className="w-full bg-red-50 hover:bg-red-100 text-red-600 py-3 rounded-xl font-medium flex items-center justify-center gap-2 border border-red-100"><RefreshCw size={18} /> 重置所有数据</button>
                <p className="text-xs text-gray-400 text-center px-2">这会清空库存数量，并严格重置为包含 A, B, C, D, E, F, G, H, M 系列的最新图谱数据。</p>
              </div>
              <button onClick={() => setShowSettings(false)} className="w-full mt-6 bg-gray-100 text-gray-600 py-3 rounded-xl font-bold">关闭</button>
           </div>
        </div>
      )}

      {/* 编辑弹窗 (核心修复: 增加了 relative 和 z-10 确保在遮罩层上方) */}
      {selectedBead && (
        <div className="absolute inset-0 z-50 flex items-end justify-center pointer-events-none">
          {/* 遮罩层 */}
          <div 
            className="absolute inset-0 bg-black/40 backdrop-blur-[2px] pointer-events-auto transition-opacity animate-in fade-in"
            onClick={() => setSelectedBead(null)}
          ></div>

          {/* 弹窗主体 - 添加了 relative 和 z-10 以防止被遮罩层覆盖 */}
          <div className="bg-white w-full max-w-md rounded-t-3xl p-6 shadow-2xl pointer-events-auto animate-in slide-in-from-bottom duration-300 flex flex-col max-h-[85vh] relative z-10">
            <div className="w-12 h-1 bg-gray-200 rounded-full mx-auto mb-6"></div>

            <div className="flex items-start gap-5 mb-8">
              <div className="w-20 h-20 rounded-2xl shadow-md border-4 border-white ring-1 ring-gray-100 shrink-0" style={{ backgroundColor: selectedBead.hex }}></div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                   <div>
                     <span className="inline-block bg-gray-100 text-gray-600 text-xs font-bold px-2 py-0.5 rounded mb-1">{SERIES_CONFIG[selectedBead.prefix]?.label || '未知系列'}</span>
                     <h2 className="text-3xl font-bold text-gray-900">{selectedBead.id}</h2>
                   </div>
                   <button onClick={() => setSelectedBead(null)} className="p-2 -mr-2 -mt-2 text-gray-400 hover:bg-gray-100 rounded-full"><X size={24} /></button>
                </div>
                <div className="mt-2 flex items-baseline gap-2">
                  <span className="text-sm text-gray-500">当前库存:</span>
                  <span className={`text-2xl font-bold ${selectedBead.count < 10 ? 'text-red-500' : 'text-blue-600'}`}>{selectedBead.count}</span>
                  <span className="text-sm text-gray-400">颗</span>
                </div>
              </div>
            </div>

            <div className="space-y-6 mb-4">
              <div className="bg-gray-50 rounded-xl p-1 flex items-center border border-gray-200">
                <div className="pl-4 text-gray-500 text-sm font-medium">修改总量</div>
                <input 
                  type="number" 
                  value={selectedBead.count}
                  onChange={handleDirectInput}
                  className="w-full bg-transparent text-right p-3 text-2xl font-bold text-gray-800 focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleAdjust(-1)} className="flex-1 bg-red-50 active:bg-red-100 text-red-600 py-3 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 border border-red-100"><Minus size={18} strokeWidth={3} /> 1</button>
                  <button onClick={() => handleAdjust(-10)} className="py-2 text-sm text-red-400 hover:text-red-600 font-medium bg-white border border-dashed border-red-200 rounded-lg">消耗 10 颗</button>
                </div>
                <div className="flex flex-col gap-2">
                  <button onClick={() => handleAdjust(1)} className="flex-1 bg-blue-50 active:bg-blue-100 text-blue-600 py-3 rounded-xl font-bold text-lg transition-colors flex items-center justify-center gap-2 border border-blue-100"><Plus size={18} strokeWidth={3} /> 1</button>
                  <div className="flex gap-2">
                    <button onClick={() => handleAdjust(10)} className="flex-1 py-2 text-sm text-blue-500 font-medium bg-white border border-blue-100 rounded-lg shadow-sm">+10</button>
                    <button onClick={() => handleAdjust(100)} className="flex-1 py-2 text-sm text-blue-500 font-medium bg-white border border-blue-100 rounded-lg shadow-sm">+100</button>
                  </div>
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedBead(null)} className="w-full bg-gray-900 text-white py-4 rounded-2xl font-bold text-lg shadow-lg active:scale-[0.99] transition-transform mt-auto">完成编辑</button>
          </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { height: 4px; width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background-color: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background-color: #cbd5e1; }
      `}</style>
    </div>
  );
}
