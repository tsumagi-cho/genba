/* Simple, local-only estimates. Nothing is transmitted or stored. */
(() => {
  const ids = ['calc-area', 'calc-depth', 'calc-density'];
  const inputs = ids.map((id) => document.getElementById(id));
  const output = document.getElementById('calc-result');
  if (inputs.some((x) => !x) || !output) return;
  const render = () => {
    const [area, depth, density] = inputs.map((x) => Number(x.value));
    if (![area, depth, density].every((n) => Number.isFinite(n) && n > 0)) {
      output.textContent = 'すべての項目に正の数値を入力してください。';
      return;
    }
    const volume = area * (depth / 100);
    const kg = volume * density * 1000;
    output.textContent = `必要体積：約${volume.toFixed(2)}m³ ／ 重量の目安：約${Math.round(kg).toLocaleString('ja-JP')}kg`;
  };
  inputs.forEach((input) => input.addEventListener('input', render));
  render();
})();
